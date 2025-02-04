import asyncio
import logging
import subprocess
from datetime import datetime
from croniter import croniter

logger = logging.getLogger(__name__)


class JobManager:
    def __init__(self, database_client):
        self.db_client = database_client
        self.running = False
        self.check_jobs_task = None

    async def execute_job(self, job):
        """
        Execute a specific job and update its run status
        """
        try:
            logger.info(f"Executing job: {job.name}")
            process = subprocess.Popen(
                job.command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            stdout, stderr = process.communicate()

            if process.returncode == 0:
                logger.info(f"Job {job.name} completed successfully")
            else:
                logger.error(f"Job {job.name} failed: {stderr.decode()}")

            # Update last run time
            await self.db_client.update_job_last_run(job.id, datetime.now())

            # Calculate and update next run time
            cron = croniter(job.schedule, datetime.now())
            next_run = cron.get_next(datetime)
            await self.db_client.update_job_next_run(job.id, next_run)

        except Exception as e:
            logger.error(f"Error executing job {job.name}: {str(e)}")

    async def check_and_run_jobs(self):
        """
        Check for jobs that need to be run and execute them
        """
        try:
            while self.running:
                try:
                    current_time = datetime.now()
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
