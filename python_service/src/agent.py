import asyncio
import logging
from dotenv import load_dotenv
import uvicorn
import os
import signal

from src.database.prisma_client import DatabaseClient
from src.integrations.notion_client import NotionIntegration
from src.integrations.openai_client import AIClientFactory, AIProvider
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
        
        # Initialize AI client
        provider_str = os.getenv("AI_PROVIDER", "openai").lower()
        model = os.getenv("AI_MODEL")  # Generic model env var
        api_base = os.getenv("AI_API_BASE")  # Generic base URL env var
        
        # Provider-specific configurations
        if provider_str == "openai":
            api_key = os.getenv("OPENAI_API_KEY")
            model = model or os.getenv("OPENAI_MODEL", "gpt-4")
            api_base = api_base or os.getenv("OPENAI_API_BASE")
        elif provider_str == "ollama":
            api_key = None  # Ollama doesn't need an API key
            model = model or os.getenv("OLLAMA_MODEL", "llama3.2")
            api_base = api_base or os.getenv("OLLAMA_API_BASE", "http://localhost:11434")
        else:  # custom
            api_key = os.getenv("CUSTOM_API_KEY")
            model = model or os.getenv("CUSTOM_MODEL")
            api_base = api_base or os.getenv("CUSTOM_API_BASE")
        
        try:
            provider = AIProvider(provider_str)
            self.ai_client = AIClientFactory.create_client(
                provider=provider,
                api_key=api_key,
                model=model,
                api_base=api_base
            )
        except Exception as e:
            logger.error(f"Error initializing AI client: {str(e)}")
            self.ai_client = None

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
        self.server = uvicorn.Server(config)
        self.server.config.setup_event_loop()
        return await self.server.serve()

    async def start(self):
        """
        Start the agent's job management and API server concurrently
        """
        try:
            await self.initialize()
            
            # Set up signal handling for graceful shutdown
            loop = asyncio.get_running_loop()
            stop_event = asyncio.Event()
            
            def signal_handler():
                logger.info("Received shutdown signal")
                if not stop_event.is_set():
                    stop_event.set()
            
            for sig in (signal.SIGINT, signal.SIGTERM):
                loop.add_signal_handler(sig, signal_handler)
            
            # Start job manager and server tasks
            self.job_manager_task = asyncio.create_task(self.job_manager.start())
            self.server_task = asyncio.create_task(self.start_server())
            
            # Wait for either a stop signal or one of the tasks to complete
            done, pending = await asyncio.wait(
                [self.job_manager_task, self.server_task, asyncio.create_task(stop_event.wait())],
                return_when=asyncio.FIRST_COMPLETED
            )
            
            # Begin shutdown
            await self.stop()
            
        except Exception as e:
            logger.error(f"Error starting agent: {str(e)}")
            await self.stop()

    async def stop(self):
        """
        Stop the agent and clean up resources gracefully
        """
        logger.info("Starting graceful shutdown...")
        
        # Stop the server first
        if hasattr(self, 'server') and self.server:
            self.server.should_exit = True
            if hasattr(self, 'server_task') and not self.server_task.done():
                try:
                    await asyncio.wait_for(self.server_task, timeout=5.0)
                except asyncio.TimeoutError:
                    logger.warning("Server shutdown timed out")
                    self.server_task.cancel()
                except Exception as e:
                    logger.error(f"Error shutting down server: {str(e)}")
        
        # Stop job manager
        try:
            if hasattr(self, 'job_manager_task') and not self.job_manager_task.done():
                self.job_manager_task.cancel()
                try:
                    await asyncio.wait_for(self.job_manager_task, timeout=5.0)
                except asyncio.TimeoutError:
                    logger.warning("Job manager shutdown timed out")
                except Exception as e:
                    logger.error(f"Error stopping job manager: {str(e)}")
        except Exception as e:
            logger.error(f"Error during job manager shutdown: {str(e)}")
        
        # Disconnect database
        try:
            await self.database_client.disconnect()
        except Exception as e:
            logger.error(f"Error disconnecting database: {str(e)}")
        
        logger.info("Job agent stopped completely")

    async def chat_with_ai(self, messages: list, **kwargs):
        """
        Wrapper method to interact with the AI model
        """
        if not self.ai_client:
            raise ValueError("AI client not properly initialized")
        return await self.ai_client.chat_completion(messages, **kwargs)

    async def get_embedding(self, text: str):
        """
        Get embeddings for the given text
        """
        if not self.ai_client:
            raise ValueError("AI client not properly initialized")
        return await self.ai_client.embedding(text)

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