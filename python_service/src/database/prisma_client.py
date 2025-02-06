from prisma import Prisma
from datetime import datetime, timezone
import logging
from src.utils.cache import CacheManager
import asyncio

logger = logging.getLogger(__name__)


class DatabaseClient:
    def __init__(self):
        self.client = Prisma()
        self.cache = CacheManager()
        # Flag to track connection status
        self._is_connected = False

    async def ensure_connected(self):
        """Ensure the database is connected, but only connect once"""
        if not self._is_connected:
            await self.connect()
            self._is_connected = True

    @property
    def default_ttl(self):
        """Default cache TTL for database queries (1 minute)"""
        return 60

    async def connect(self):
        """Establish database connection"""
        await self.client.connect()

    async def disconnect(self):
        """Close database connection"""
        if self._is_connected:
            await self.client.disconnect()
            self._is_connected = False

    async def seed_default_jobs(self):
        """Seed database with default jobs if no jobs exist"""
        # Ensure connection
        await self.ensure_connected()

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

    # Chat Thread Methods
    async def create_chat_thread(self, model: str):
        """Create a new chat thread"""
        # Ensure connection
        await self.ensure_connected()

        try:
            thread = await self.client.chatthread.create(
                data={
                    "model": model,
                }
            )
            return thread
        except Exception as e:
            logger.error(f"Error creating chat thread: {str(e)}")
            raise

    async def get_chat_thread(self, thread_id: str):
        """Get a chat thread by ID"""
        # Ensure connection
        await self.ensure_connected()

        try:
            thread = await self.client.chatthread.find_unique(
                where={"id": thread_id}, include={"messages": True}
            )
            return thread
        except Exception as e:
            logger.error(f"Error getting chat thread: {str(e)}")
            raise

    async def list_chat_threads(self):
        """List all chat threads"""
        # Ensure connection
        await self.ensure_connected()

        try:
            threads = await self.client.chatthread.find_many(
                include={"messages": True}, order={"createdAt": "desc"}
            )
            return threads
        except Exception as e:
            logger.error(f"Error listing chat threads: {str(e)}")
            raise

    async def delete_chat_thread(self, thread_id: str):
        """Delete a chat thread"""
        # Ensure connection
        await self.ensure_connected()

        try:
            await self.client.chatmessage.delete_many(where={"threadId": thread_id})
            await self.client.chatthread.delete(where={"id": thread_id})
        except Exception as e:
            logger.error(f"Error deleting chat thread: {str(e)}")
            raise

    async def add_chat_message(self, thread_id: str, role: str, content: str):
        """Add a message to a chat thread"""
        # Ensure connection
        await self.ensure_connected()

        try:
            message = await self.client.chatmessage.create(
                data={
                    "role": role,
                    "content": content,
                    "threadId": thread_id,
                }
            )
            return message
        except Exception as e:
            logger.error(f"Error adding chat message: {str(e)}")
            raise

    async def get_active_jobs(self, current_time):
        """Retrieve active jobs that are due to run"""
        # Ensure connection
        await self.ensure_connected()

        # Ensure current_time is timezone-aware
        if current_time.tzinfo is None:
            current_time = current_time.replace(tzinfo=timezone.utc)

        cache_key = "active_jobs"

        # Try to get from cache first
        cached_jobs = self.cache.get(cache_key)
        if cached_jobs is not None:
            # Filter cached jobs based on current time
            return [
                job
                for job in cached_jobs
                if (
                    job.nextRun.replace(tzinfo=timezone.utc)
                    if job.nextRun.tzinfo is None
                    else job.nextRun
                )
                <= current_time
            ]

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
        # Ensure connection
        await self.ensure_connected()

        try:
            # Ensure last_run_time is timezone-aware
            if last_run_time.tzinfo is None:
                last_run_time = last_run_time.replace(tzinfo=timezone.utc)

            # Clear cache since job state is changing
            self.cache.delete("active_jobs")

            await self.client.job.update(
                where={"id": job_id}, data={"lastRun": last_run_time}
            )
        except Exception as e:
            logger.error(f"Error updating job last run: {str(e)}")
            raise

    async def update_job_next_run(self, job_id, next_run_time):
        """Update the next run time for a job"""
        # Ensure connection
        await self.ensure_connected()

        try:
            # Ensure next_run_time is timezone-aware
            if next_run_time.tzinfo is None:
                next_run_time = next_run_time.replace(tzinfo=timezone.utc)

            # Clear cache since job state is changing
            self.cache.delete("active_jobs")

            await self.client.job.update(
                where={"id": job_id}, data={"nextRun": next_run_time}
            )
        except Exception as e:
            logger.error(f"Error updating job next run: {str(e)}")
            raise

    async def __aenter__(self):
        """Context manager entry point"""
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit point"""
        await self.disconnect()
