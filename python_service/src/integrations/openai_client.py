from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
import openai
import logging
from enum import Enum
from ollama import AsyncClient
import asyncio
from functools import partial

logger = logging.getLogger(__name__)

class AIProvider(Enum):
    OPENAI = "openai"
    OLLAMA = "ollama"
    CUSTOM = "custom"

class AIResponse:
    def __init__(self, content: str, raw_response: Any = None):
        self.content = content
        self.raw_response = raw_response

class BaseAIClient(ABC):
    @abstractmethod
    async def chat_completion(self, messages: List[Dict[str, str]], **kwargs) -> AIResponse:
        pass

    @abstractmethod
    async def embedding(self, text: str) -> List[float]:
        pass

class OpenAIClient(BaseAIClient):
    def __init__(
        self,
        api_key: str,
        model: str = "gpt-4",
        api_base: Optional[str] = None,
        api_type: str = "openai"
    ):
        self.api_key = api_key
        self.model = model
        self.client = openai.AsyncOpenAI(
            api_key=api_key,
            base_url=api_base if api_base else "https://api.openai.com/v1"
        )
        self.api_type = api_type

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> AIResponse:
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )
            return AIResponse(
                content=response.choices[0].message.content,
                raw_response=response
            )
        except Exception as e:
            logger.error(f"Error in chat completion: {str(e)}")
            raise

    async def embedding(self, text: str) -> List[float]:
        try:
            response = await self.client.embeddings.create(
                model="text-embedding-ada-002",
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error in embedding: {str(e)}")
            raise

class OllamaClient(BaseAIClient):
    def __init__(
        self,
        model: str = "llama3.2",
        api_base: str = "http://localhost:11434",
    ):
        self.model = model
        self.client = AsyncClient(host=api_base)

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> AIResponse:
        try:
            response = await self.client.chat(
                model=self.model,
                messages=messages,
                options={
                    "temperature": temperature,
                    **({"num_predict": max_tokens} if max_tokens else {})
                }
            )
            
            return AIResponse(
                content=response['message']['content'],
                raw_response=response
            )
        except Exception as e:
            logger.error(f"Error in Ollama chat completion: {str(e)}")
            raise

    async def embedding(self, text: str) -> List[float]:
        try:
            response = await self.client.embeddings(
                model=self.model,
                prompt=text,
            )
            
            return response['embeddings']
        except Exception as e:
            logger.error(f"Error in Ollama embedding: {str(e)}")
            raise

class AIClientFactory:
    @staticmethod
    def create_client(
        provider: AIProvider,
        api_key: str = None,
        model: str = None,
        api_base: Optional[str] = None
    ) -> BaseAIClient:
        if provider == AIProvider.OPENAI:
            if not api_key:
                raise ValueError("API key is required for OpenAI")
            return OpenAIClient(api_key=api_key, model=model or "gpt-4")
        elif provider == AIProvider.OLLAMA:
            return OllamaClient(
                model=model or "llama3.2",
                api_base=api_base or "http://localhost:11434"
            )
        elif provider == AIProvider.CUSTOM:
            if not api_key:
                raise ValueError("API key is required for custom provider")
            return OpenAIClient(api_key=api_key, model=model, api_base=api_base)
        else:
            raise ValueError(f"Unsupported AI provider: {provider}") 