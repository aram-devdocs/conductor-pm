from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
import openai
import logging
from enum import Enum
from ollama import AsyncClient
import asyncio
from functools import partial
import os
import json
from src.utils.cache import CacheManager

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
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None, api_base: Optional[str] = None):
        self.api_key = api_key
        self.model = model
        self.api_base = api_base
        self.cache = CacheManager()
        
    @property
    def default_ttl(self):
        """Default cache TTL for AI responses (1 hour)"""
        return 3600
        
    def _generate_cache_key(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Generate a unique cache key for the request"""
        key_parts = [
            self.model,
            json.dumps(messages, sort_keys=True),
            json.dumps(kwargs, sort_keys=True)
        ]
        return f"ai_response_{'_'.join(key_parts)}"
        
    def _generate_embedding_cache_key(self, text: str) -> str:
        """Generate a unique cache key for embeddings"""
        return f"ai_embedding_{self.model}_{text}"

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
        super().__init__(api_key=api_key, model=model, api_base=api_base)
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
        cache_key = self._generate_cache_key(messages, **kwargs)
        
        # Try to get from cache first
        cached_response = self.cache.get(cache_key)
        if cached_response is not None:
            return AIResponse(content=cached_response)
            
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs
            )
            result = response.model_dump()
            
            # Cache the result
            self.cache.set(cache_key, result['choices'][0]['message']['content'], ttl=self.default_ttl)
            return AIResponse(
                content=result['choices'][0]['message']['content'],
                raw_response=result
            )
        except Exception as e:
            logger.error(f"Error in chat completion: {str(e)}")
            raise

    async def embedding(self, text: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text)
        
        # Try to get from cache first
        cached_embedding = self.cache.get(cache_key)
        if cached_embedding is not None:
            return cached_embedding
            
        try:
            response = await self.client.embeddings.create(
                model="text-embedding-ada-002",
                input=text
            )
            embedding = response.data[0].embedding
            
            # Cache the result
            self.cache.set(cache_key, embedding, ttl=self.default_ttl)
            return embedding
        except Exception as e:
            logger.error(f"Error in embedding: {str(e)}")
            raise

class OllamaClient(BaseAIClient):
    def __init__(
        self,
        model: str = "llama3.2",
        api_base: str = "http://localhost:11434",
    ):
        super().__init__(model=model, api_base=api_base)
        self.client = AsyncClient(host=api_base)

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> AIResponse:
        cache_key = self._generate_cache_key(messages, **kwargs)
        
        # Try to get from cache first
        cached_response = self.cache.get(cache_key)
        if cached_response is not None:
            return AIResponse(content=cached_response)
            
        try:
            response = await self.client.chat(
                model=self.model,
                messages=messages,
                options={
                    "temperature": temperature,
                    **({"num_predict": max_tokens} if max_tokens else {})
                }
            )
            
            # Cache the result
            self.cache.set(cache_key, response['message']['content'], ttl=self.default_ttl)
            return AIResponse(
                content=response['message']['content'],
                raw_response=response
            )
        except Exception as e:
            logger.error(f"Error in Ollama chat completion: {str(e)}")
            raise

    async def embedding(self, text: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text)
        
        # Try to get from cache first
        cached_embedding = self.cache.get(cache_key)
        if cached_embedding is not None:
            return cached_embedding
            
        try:
            response = await self.client.embeddings(
                model=self.model,
                prompt=text,
            )
            
            # Cache the result
            self.cache.set(cache_key, response['embeddings'], ttl=self.default_ttl)
            return response['embeddings']
        except Exception as e:
            logger.error(f"Error in Ollama embedding: {str(e)}")
            raise

class CustomAIClient(BaseAIClient):
    def __init__(self, api_key: str, model: str, api_base: str):
        super().__init__(api_key=api_key, model=model, api_base=api_base)
        self.client = openai.AsyncOpenAI(
            api_key=api_key,
            base_url=f"{api_base}"
        )

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = 4000,
        **kwargs
    ) -> AIResponse:
        cache_key = self._generate_cache_key(messages, **kwargs)
        
        # Try to get from cache first
        cached_response = self.cache.get(cache_key)
        if cached_response is not None:
            return AIResponse(content=cached_response)
            
        try:
            # Structure the request with inferenceConfig
            request_params = {
                "model": self.model,
                "messages": messages,
                "inferenceConfig": {
                    "temperature": temperature,
                    "maxTokens": max_tokens
                }
            }
            request_params.update(kwargs)
            
            response = await self.client.chat.completions.create(**request_params)
            result = response.model_dump()
            
            # Cache the result
            self.cache.set(cache_key, result['choices'][0]['message']['content'], ttl=self.default_ttl)
            return AIResponse(
                content=result['choices'][0]['message']['content'],
                raw_response=result
            )
        except Exception as e:
            logger.error(f"Error in chat completion: {str(e)}")
            raise

    async def embedding(self, text: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text)
        
        # Try to get from cache first
        cached_embedding = self.cache.get(cache_key)
        if cached_embedding is not None:
            return cached_embedding
            
        try:
            response = await self.client.embeddings.create(
                model=self.model,
                input=text
            )
            embedding = response.data[0].embedding
            
            # Cache the result
            self.cache.set(cache_key, embedding, ttl=self.default_ttl)
            return embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
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
            return CustomAIClient(api_key=api_key, model=model, api_base=api_base)
        else:
            raise ValueError(f"Unsupported AI provider: {provider}") 