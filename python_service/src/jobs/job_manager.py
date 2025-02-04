import asyncio
import logging
import subprocess
from datetime import datetime, timezone
from croniter import croniter
from src.utils.cache import CacheManager

logger = logging.getLogger(__name__)


class JobManager:
    def __init__(self, database_client):
        self.db_client = database_client
        self.running = False
        self.check_jobs_task = None
        self.cache = CacheManager()

    @property
    def default_ttl(self):
        """Default cache TTL for job execution results (1 hour)"""
        return 3600

    async def execute_job(self, job):
        """
        Execute a specific job and update its run status
        """
        # Ensure job's lastRun is timezone-aware
        last_run_str = job.lastRun.isoformat() if job.lastRun else 'never'
        cache_key = f"job_result_{job.id}_{last_run_str}"
        
        try:
            # Check if we have a cached result from the last execution
            cached_result = self.cache.get(cache_key)
            if cached_result is not None:
                logger.info(f"Using cached result for job {job.name}")
                return cached_result
                
            logger.info(f"Executing job: {job.name}")
            process = subprocess.Popen(
                job.command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            stdout, stderr = process.communicate()

            result = {
                'success': process.returncode == 0,
                'stdout': stdout.decode() if stdout else None,
                'stderr': stderr.decode() if stderr else None,
                'return_code': process.returncode,
                'execution_time': datetime.now(timezone.utc).isoformat()
            }

            if process.returncode == 0:
                logger.info(f"Job {job.name} completed successfully")
            else:
                logger.error(f"Job {job.name} failed: {stderr.decode()}")

            # Update last run time
            current_time = datetime.now(timezone.utc)
            await self.db_client.update_job_last_run(job.id, current_time)

            # Calculate and update next run time
            cron = croniter(job.schedule, current_time)
            next_run = cron.get_next(datetime).replace(tzinfo=timezone.utc)
            await self.db_client.update_job_next_run(job.id, next_run)
            
            # Cache the successful result
            if result['success']:
                self.cache.set(cache_key, result, ttl=self.default_ttl)
                
            return result

        except Exception as e:
            logger.error(f"Error executing job {job.name}: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'execution_time': datetime.now(timezone.utc).isoformat()
            }

    async def check_and_run_jobs(self):
        """
        Check for jobs that need to be run and execute them
        """
        try:
            while self.running:
                try:
                    current_time = datetime.now(timezone.utc)
                    jobs = await self.db_client.get_active_jobs(current_time)

                    for job in jobs:
                        await self.execute_job(job)

                    await asyncio.sleep(60)  # Check every minute
                except Exception as e:
                    logger.error(f"Error checking jobs: {str(e)}")
                    await asyncio.sleep(60)
        except asyncio.CancelledError:
            logger.info("Job manager check loop cancelled")
        finally:
            logger.info("Job manager check loop stopped")

    async def start(self):
        """
        Start the job manager
        """
        try:
            self.running = True
            logger.info("Job manager started")
            self.check_jobs_task = asyncio.create_task(self.check_and_run_jobs())
            # Wait for the task to complete or be cancelled
            await self.check_jobs_task
        except asyncio.CancelledError:
            logger.info("Job manager task cancelled")
        except Exception as e:
            logger.error(f"Error in job manager: {str(e)}")
        finally:
            await self.stop()

    async def stop(self):
        """
        Stop the job manager
        """
        if not self.running:
            return
            
        logger.info("Stopping job manager...")
        self.running = False

        # Cancel the check jobs task if it exists
        if self.check_jobs_task and not self.check_jobs_task.done():
            self.check_jobs_task.cancel()
            try:
                await asyncio.wait_for(self.check_jobs_task, timeout=5.0)
            except asyncio.TimeoutError:
                logger.warning("Job manager shutdown timed out")
            except asyncio.CancelledError:
                pass
            except Exception as e:
                logger.error(f"Error during job manager shutdown: {str(e)}")

        logger.info("Job manager stopped")
