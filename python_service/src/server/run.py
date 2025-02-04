import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

def start_server():
    """Start the FastAPI server"""
    port = int(os.getenv("API_PORT", "8000"))
    host = os.getenv("API_HOST", "0.0.0.0")
    
    uvicorn.run(
        "src.server.server:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    start_server() 