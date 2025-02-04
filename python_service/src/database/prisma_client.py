from prisma import Prisma
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class DatabaseClient:
    def __init__(self):
        self.client = Prisma()

    async def connect(self):
        """Establish database connection"""
        await self.client.connect()

    async def disconnect(self):
        """Close database connection"""
        await self.client.disconnect()

    async def seed_default_jobs(self):
        """Seed database with default jobs if no jobs exist"""
        jobs = await self.client.job.find_many()
        if len(jobs) == 0:
            await self.client.job.create(
                data={
                    "name": "Test Job",
                    "schedule": "0 0 * * *",
                    "command": 'echo "Test Job Executed"',
                    "isActive": True,
                    "nextRun": datetime.now(),
                }
            )

    async def get_active_jobs(self, current_time):
        """Retrieve active jobs that are due to run"""
        return await self.client.job.find_many(
            where={"isActive": True, "nextRun": {"lte": current_time}},
            order={"nextRun": "asc"},
        )

    async def update_job_last_run(self, job_id, last_run_time):
        """Update the last run time for a job"""
        await self.client.job.update(
            where={"id": job_id}, 
            data={"lastRun": last_run_time}
        )

    async def update_job_next_run(self, job_id, next_run_time):
        """Update the next run time for a job"""
        await self.client.job.update(
            where={"id": job_id}, 
            data={"nextRun": next_run_time}
        ) 