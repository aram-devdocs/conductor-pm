from prisma import Prisma
from datetime import datetime, timezone
import logging
from src.utils.cache import CacheManager

logger = logging.getLogger(__name__)

class DatabaseClient:
    def __init__(self):
        self.client = Prisma()
        self.cache = CacheManager()
        
    @property
    def default_ttl(self):
        """Default cache TTL for database queries (1 minute)"""
        return 60

    async def connect(self):
        """Establish database connection"""
        await self.client.connect()

    async def disconnect(self):
        """Close database connection"""
        await self.client.disconnect()

    async def seed_default_jobs(self):
        """Seed database with default jobs if no jobs exist"""
        # Clear cache when seeding
        self.cache.delete("active_jobs")
        
        jobs = await self.client.job.find_many()
        if len(jobs) == 0:
            await self.client.job.create(
                data={
                    "name": "Test Job",
                    "schedule": "0 0 * * *",
                    "command": 'echo "Test Job Executed"',
                    "isActive": True,
                    "nextRun": datetime.now(timezone.utc),
                }
            )

    async def get_active_jobs(self, current_time):
        """Retrieve active jobs that are due to run"""
        # Ensure current_time is timezone-aware
        if current_time.tzinfo is None:
            current_time = current_time.replace(tzinfo=timezone.utc)
        
        cache_key = "active_jobs"
        
        # Try to get from cache first
        cached_jobs = self.cache.get(cache_key)
        if cached_jobs is not None:
            # Filter cached jobs based on current time
            return [job for job in cached_jobs if 
                    (job.nextRun.replace(tzinfo=timezone.utc) if job.nextRun.tzinfo is None else job.nextRun) 
                    <= current_time]
            
        try:
            jobs = await self.client.job.find_many(
                where={"isActive": True},
                order={"nextRun": "asc"},
            )
            
            # Ensure all jobs have timezone-aware nextRun
            for job in jobs:
                if job.nextRun.tzinfo is None:
                    job.nextRun = job.nextRun.replace(tzinfo=timezone.utc)
            
            # Cache all active jobs
            self.cache.set(cache_key, jobs, ttl=self.default_ttl)
            
            # Return only jobs due to run
            return [job for job in jobs if job.nextRun <= current_time]
        except Exception as e:
            logger.error(f"Error getting active jobs: {str(e)}")
            raise

    async def update_job_last_run(self, job_id, last_run_time):
        """Update the last run time for a job"""
        try:
            # Ensure last_run_time is timezone-aware
            if last_run_time.tzinfo is None:
                last_run_time = last_run_time.replace(tzinfo=timezone.utc)
            
            # Clear cache since job state is changing
            self.cache.delete("active_jobs")
            
            await self.client.job.update(
                where={"id": job_id}, 
                data={"lastRun": last_run_time}
            )
        except Exception as e:
            logger.error(f"Error updating job last run: {str(e)}")
            raise

    async def update_job_next_run(self, job_id, next_run_time):
        """Update the next run time for a job"""
        try:
            # Ensure next_run_time is timezone-aware
            if next_run_time.tzinfo is None:
                next_run_time = next_run_time.replace(tzinfo=timezone.utc)
            
            # Clear cache since job state is changing
            self.cache.delete("active_jobs")
            
            await self.client.job.update(
                where={"id": job_id}, 
                data={"nextRun": next_run_time}
            )
        except Exception as e:
            logger.error(f"Error updating job next run: {str(e)}")
            raise 