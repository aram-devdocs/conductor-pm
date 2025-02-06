from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from typing import List, Dict, Optional
from pydantic import BaseModel, Field
from datetime import datetime

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
    thread_id: str = Field(..., description="The ID of the chat thread to use")
    temperature: Optional[float] = Field(0.7, ge=0.0, le=1.0, description="Temperature for response generation")
    max_tokens: Optional[int] = Field(None, gt=0, description="Maximum number of tokens to generate")
class EmbeddingRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to generate embeddings for")
    thread_id: str = Field(..., description="The ID of the chat thread to use")

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
            max_tokens=request.max_tokens,
            thread_id=request.thread_id
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
        embedding = await agent.get_embedding(request.text, thread_id=request.thread_id)
        return {"embedding": embedding}
    except Exception as e:
        logger.error(f"Error getting embedding: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

class ChatThreadCreate(BaseModel):
    model: str = Field(..., description="The AI model to use for this chat thread")

class ChatThreadResponse(BaseModel):
    id: str
    createdAt: datetime
    updatedAt: datetime
    model: str
    messages: Optional[List[Message]] = None

    class Config:
        from_attributes = True
        populate_by_name = True

@app.post("/chat/threads", response_model=ChatThreadResponse)
async def create_chat_thread(thread: ChatThreadCreate):
    """Create a new chat thread"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        thread_data = await agent.create_chat_thread(thread.model)
        return thread_data
    except Exception as e:
        logger.error(f"Error creating chat thread: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat/threads/{thread_id}", response_model=ChatThreadResponse)
async def get_chat_thread(thread_id: str):
    """Get a chat thread by ID"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        thread_data = await agent.get_chat_thread(thread_id)
        if not thread_data:
            raise HTTPException(status_code=404, detail=f"Chat thread {thread_id} not found")
        return thread_data
    except Exception as e:
        logger.error(f"Error getting chat thread: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat/threads", response_model=List[ChatThreadResponse])
async def list_chat_threads():
    """List all chat threads"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        threads = await agent.list_chat_threads()
        return threads
    except Exception as e:
        logger.error(f"Error listing chat threads: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/chat/threads/{thread_id}")
async def delete_chat_thread(thread_id: str):
    """Delete a chat thread"""
    try:
        from src.agent import JobAgent
        agent = JobAgent()
        await agent.delete_chat_thread(thread_id)
        return {"message": f"Chat thread {thread_id} deleted"}
    except Exception as e:
        logger.error(f"Error deleting chat thread: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 