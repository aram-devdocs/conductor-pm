import asyncio
import logging
from datetime import datetime
from croniter import croniter
import subprocess
from prisma import Prisma

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class JobAgent:
    def __init__(self):
        self.db = Prisma()
        self.running = False

    async def seed(self):
        # check for jobs, if none exist seed with default jobs
        jobs = await self.db.job.find_many()
        if len(jobs) == 0:
            await self.db.job.create(
                data={
                    "name": "Test Job",
                    "schedule": "0 0 * * *",
                    "command": 'echo "Test Job Executed"',
                    "isActive": True,
                    "nextRun": datetime.now(),
                }
            )

    async def connect(self):
        await self.db.connect()

    async def disconnect(self):
        await self.db.disconnect()

    async def update_job_next_run(self, job):
        cron = croniter(job.schedule, datetime.now())
        next_run = cron.get_next(datetime)
        await self.db.job.update(where={"id": job.id}, data={"nextRun": next_run})

    async def execute_job(self, job):
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

            await self.db.job.update(
                where={"id": job.id}, data={"lastRun": datetime.now()}
            )
            await self.update_job_next_run(job)
        except Exception as e:
            logger.error(f"Error executing job {job.name}: {str(e)}")

    async def check_jobs(self):
        while self.running:
            print("Checking jobs at: ", datetime.now())
            try:
                current_time = datetime.now()
                jobs = await self.db.job.find_many(
                    where={"isActive": True, "nextRun": {"lte": current_time}},
                    order={"nextRun": "asc"},
                )

                for job in jobs:
                    await self.execute_job(job)

                await asyncio.sleep(60)  # Check every minute
            except Exception as e:
                logger.error(f"Error checking jobs: {str(e)}")
                await asyncio.sleep(60)

    async def start(self):
        self.running = True
        logger.info("Job agent started")
        await self.check_jobs()

    async def stop(self):
        self.running = False
        await self.disconnect()
        logger.info("Job agent stopped")


async def main():
    agent = JobAgent()
    try:
        await agent.connect()
        await agent.seed()
        await agent.start()
    except KeyboardInterrupt:
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
