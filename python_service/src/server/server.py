from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

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

class Message(BaseModel):
    role: str = Field(..., description="The role of the message sender (e.g., 'user', 'assistant')")
    content: str = Field(..., description="The content of the message")

class ChatRequest(BaseModel):
    messages: List[Message]
    temperature: Optional[float] = Field(0.7, ge=0.0, le=1.0, description="Temperature for response generation")
    max_tokens: Optional[int] = Field(None, gt=0, description="Maximum number of tokens to generate")

class EmbeddingRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to generate embeddings for")

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

@app.post("/ai/chat")
async def chat_completion(request: ChatRequest):
    """AI chat completion endpoint"""
    try:
        logger.info(f"Received chat request with {len(request.messages)} messages")
        logger.debug(f"Request details: {request.model_dump_json()}")
        
        from src.agent import JobAgent
        agent = JobAgent()
        
        # Convert Pydantic models to dictionaries
        messages = [msg.model_dump() for msg in request.messages]
        logger.info(f"Processing chat with model: {agent.ai_client.model if agent.ai_client else 'No model'}")
        
        response = await agent.chat_with_ai(
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        logger.info("Chat completion successful")
        return response
    except Exception as e:
        error_msg = f"Error in chat completion: {str(e)}"
        logger.error(error_msg)
        if "Connection refused" in str(e):
            raise HTTPException(
                status_code=503,
                detail="Could not connect to AI service. Make sure Ollama is running if using local models."
            )
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/embedding")
async def get_embedding(request: EmbeddingRequest):
    """Get text embedding endpoint"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        embedding = await agent.get_embedding(request.text)
        return {"embedding": embedding}
    except Exception as e:
        logger.error(f"Error getting embedding: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 