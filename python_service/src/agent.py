import asyncio
import logging
from dotenv import load_dotenv
import uvicorn
import os

from src.database.prisma_client import DatabaseClient
from src.integrations.notion_client import NotionIntegration
from src.jobs.job_manager import JobManager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobAgent:
    def __init__(self):
        load_dotenv()  # Load environment variables from .env file
        self.database_client = DatabaseClient()
        self.notion_client = NotionIntegration()
        self.job_manager = JobManager(self.database_client)
        self.server_task = None

    async def initialize(self):
        """
        Initialize the agent by connecting to the database and seeding if necessary
        """
        await self.database_client.connect()
        await self.database_client.seed_default_jobs()

    async def get_current_sprint(self):
        """
        Wrapper method to get current sprint from Notion
        """
        return self.notion_client.get_current_sprint()

    async def get_all_users(self):
        """
        Wrapper method to get all users from Notion
        """
        return self.notion_client.get_all_users()

    async def start_server(self):
        """
        Start the FastAPI server in the background
        """
        config = uvicorn.Config(
            "src.server.server:app",
            host=os.getenv("API_HOST", "0.0.0.0"),
            port=int(os.getenv("API_PORT", "8000")),
            log_level="info"
        )
        server = uvicorn.Server(config)
        await server.serve()

    async def start(self):
        """
        Start the agent's job management and API server
        """
        try:
            await self.initialize()
            # Create tasks for both the job manager and API server
            self.server_task = asyncio.create_task(self.start_server())
            await self.job_manager.start()
        except Exception as e:
            logger.error(f"Error starting agent: {str(e)}")
            await self.stop()

    async def stop(self):
        """
        Stop the agent and clean up resources
        """
        if self.server_task:
            self.server_task.cancel()
            try:
                await self.server_task
            except asyncio.CancelledError:
                pass
        await self.job_manager.stop()
        await self.database_client.disconnect()
        logger.info("Job agent stopped")

async def main():
    agent = JobAgent()
    try:
        # Example of how to use the new methods
        users = await agent.get_all_users()
        logger.info(f"Retrieved {len(users.get('results', [])) if users else 0} users")
        
        sprint = await agent.get_current_sprint()
        logger.info(f"Retrieved {len(sprint.get('results', [])) if sprint else 0} sprint tasks")
        
        await agent.start()
    except KeyboardInterrupt:
        await agent.stop()

if __name__ == "__main__":
    asyncio.run(main()) 