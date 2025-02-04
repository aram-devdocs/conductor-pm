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

    async def start(self):
        """
        Start the job manager
        """
        self.running = True
        logger.info("Job manager started")
        await self.check_and_run_jobs()

    async def stop(self):
        """
        Stop the job manager
        """
        self.running = False
        logger.info("Job manager stopped") 