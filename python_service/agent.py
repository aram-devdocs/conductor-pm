import asyncio
import logging
from datetime import datetime
from croniter import croniter
import subprocess
from prisma import Prisma
from notion_client import Client
import os
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class JobAgent:
    def __init__(self):
        load_dotenv()  # Load environment variables from .env file
        self.db = Prisma()
        self.running = False
        self.notion = Client(auth=os.environ["NOTION_TOKEN"])
        self.notion_database_id = os.environ["NOTION_DATABASE_ID"]

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

    async def get_current_sprint(self):
        """
        Gets the current sprint tasks with normalized properties
        """
        try:
            response = self.notion.databases.query(
                database_id=self.notion_database_id,
            )
            
            # Process each page to extract and normalize properties
            processed_results = []
            for page in response.get('results', []):
                processed = self.parse_properties(page['properties'])
                # Preserve original properties along with processed ones
                full_page_data = {
                    **page['properties'],  # Include original properties
                    **processed,  # Include processed properties
                    'id': page['id'],
                    'created_time': page['created_time'], 
                    'created_by': page['created_by'],
                    'url': page['url'],
                    'last_edited_time': page['last_edited_time'],
                    'last_edited_by': page['last_edited_by'],
                    'parent': page['parent'],
                    'archived': page['archived'],
                    'icon': page['icon'],
                    'cover': page['cover'],
                    'parent': page['parent'],
                }
                processed_results.append(full_page_data)
                
            return {'results': processed_results}
        
        except Exception as e:
            logger.error(f"Error getting current sprint: {str(e)}")
            raise

    def parse_properties(self, properties):
        """Generic property parser that handles all Notion property types"""
        parsed = {}
        
        for prop_name, prop_data in properties.items():
            prop_type = prop_data['type']
            
            # Handle each property type appropriately
            if prop_type == 'title':
                parsed[prop_name] = ' '.join([t['plain_text'] 
                                            for t in prop_data['title']])
            elif prop_type == 'rich_text':
                parsed[prop_name] = ' '.join([t['plain_text'] 
                                            for t in prop_data['rich_text']])
            elif prop_type == 'number':
                parsed[prop_name] = prop_data['number']
            elif prop_type == 'select':
                parsed[prop_name] = prop_data['select']['name'] if prop_data['select'] else None
            elif prop_type == 'multi_select':
                parsed[prop_name] = [item['name'] for item in prop_data['multi_select']]
            elif prop_type == 'date':
                parsed[prop_name] = {
                    'start': prop_data['date']['start'],
                    'end': prop_data['date']['end']
                } if prop_data['date'] else None
            elif prop_type == 'people':
                parsed[prop_name] = [person['id'] for person in prop_data['people']]
            elif prop_type == 'files':
                parsed[prop_name] = [file['file']['url'] for file in prop_data['files']]
            elif prop_type == 'checkbox':
                parsed[prop_name] = prop_data['checkbox']
            elif prop_type == 'url':
                parsed[prop_name] = prop_data['url']
            elif prop_type == 'email':
                parsed[prop_name] = prop_data['email']
            elif prop_type == 'phone_number':
                parsed[prop_name] = prop_data['phone_number']
            elif prop_type == 'formula':
                parsed[prop_name] = prop_data['formula'][prop_data['formula']['type']]
            elif prop_type == 'relation':
                parsed[prop_name] = [rel['id'] for rel in prop_data['relation']]
            elif prop_type == 'rollup':
                parsed[prop_name] = prop_data['rollup'][prop_data['rollup']['type']]
            elif prop_type == 'status':
                parsed[prop_name] = prop_data['status']['name'] if prop_data['status'] else None
            else:
                parsed[prop_name] = str(prop_data[prop_type])
                
        return parsed
    async def get_database(self, database_id):
        """
        Gets a database from Notion
        """
        try:
            database = self.notion.databases.query(database_id=database_id)
            return database
        except Exception as e:
            logger.error(f"Error getting database: {str(e)}")
            raise
        
        
    async def get_page(self, page_id):
        """
        Gets a page from Notion
        """
        try:
            page = self.notion.pages.retrieve(page_id=page_id)
            return page
        except Exception as e:
            logger.error(f"Error getting page: {str(e)}")
            raise

    async def get_all_users(self):
        """
        Gets all users from Notion
        """
        try:
            users = self.notion.users.list()
            return users
        except Exception as e:
            logger.error(f"Error getting all users: {str(e)}")
            raise


async def main():
    agent = JobAgent()
    try:
        sprint = await agent.get_current_sprint()
        await agent.connect()
        await agent.seed()
        await agent.start()
    except KeyboardInterrupt:
        await agent.stop()


if __name__ == "__main__":
    asyncio.run(main())
