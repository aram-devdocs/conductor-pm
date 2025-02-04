from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Conductor PM Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/sprint/current")
async def get_current_sprint():
    """Get current sprint details"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        sprint = await agent.get_current_sprint()
        return sprint
    except Exception as e:
        logger.error(f"Error getting current sprint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users")
async def get_users():
    """Get all users"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        users = await agent.get_all_users()
        return users
    except Exception as e:
        logger.error(f"Error getting users: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 