import os
import logging
from notion_client import Client
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class NotionIntegration:
    def __init__(self):
        self.client = Client(auth=os.environ["NOTION_TOKEN"])
        self.database_id = os.environ["NOTION_DATABASE_ID"]

    def get_current_sprint(self):
        """
        Gets the current sprint tasks with normalized properties
        """
        try:
            response = self.client.databases.query(
                database_id=self.database_id,
            )
            
            # Process each page to extract and normalize properties
            processed_results = []
            for page in response.get('results', []):
                processed = self._parse_properties(page['properties'])
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
                }
                processed_results.append(full_page_data)
                
            return {'results': processed_results}
        
        except Exception as e:
            logger.error(f"Error getting current sprint: {str(e)}")
            raise

    def _parse_properties(self, properties):
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

    def get_database(self, database_id):
        """
        Gets a database from Notion
        """
        try:
            database = self.client.databases.query(database_id=database_id)
            return database
        except Exception as e:
            logger.error(f"Error getting database: {str(e)}")
            raise

    def get_page(self, page_id):
        """
        Gets a page from Notion
        """
        try:
            page = self.client.pages.retrieve(page_id=page_id)
            return page
        except Exception as e:
            logger.error(f"Error getting page: {str(e)}")
            raise

    def get_all_users(self):
        """
        Gets all users from Notion
        """
        try:
            users = self.client.users.list()
            return users
        except Exception as e:
            logger.error(f"Error getting all users: {str(e)}")
            raise 