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
import httpx
import boto3
import json

logger = logging.getLogger(__name__)


class AIProvider(Enum):
    OPENAI = "openai"
    OLLAMA = "ollama"
    CUSTOM = "custom"
    BEDROCK = "bedrock"


class AIResponse:
    def __init__(self, content: str, raw_response: Any = None):
        self.content = content
        self.raw_response = raw_response


class BaseAIClient(ABC):
    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        api_base: Optional[str] = None,
    ):
        self.api_key = api_key
        self.model = model
        self.api_base = api_base
        self.cache = CacheManager()

    @property
    def default_ttl(self):
        """Default cache TTL for AI responses (1 hour)"""
        return 3600

    def _generate_cache_key(self, thread_id: str, **kwargs) -> str:
        return f"ai_chat_completion_{thread_id}"

    def _generate_embedding_cache_key(self, text: str, thread_id: str) -> str:
        """Generate a unique cache key for embeddings"""
        return f"ai_embedding_{thread_id}_{self.model}_{text}"

    @abstractmethod
    async def chat_completion(
        self, messages: List[Dict[str, str]], thread_id: str, **kwargs
    ) -> AIResponse:
        pass

    @abstractmethod
    async def embedding(self, text: str, thread_id: str) -> List[float]:
        pass


class OpenAIClient(BaseAIClient):
    def __init__(
        self,
        api_key: str,
        model: str = "gpt-4",
        api_base: Optional[str] = None,
        api_type: str = "openai",
    ):
        super().__init__(api_key=api_key, model=model, api_base=api_base)
        self.client = openai.AsyncOpenAI(
            api_key=api_key,
            base_url=api_base if api_base else "https://api.openai.com/v1",
        )
        self.api_type = api_type

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        thread_id: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> AIResponse:
        cache_key = self._generate_cache_key(thread_id, **kwargs)

        # # Try to get from cache first
        # cached_response = self.cache.get(cache_key)
        # if cached_response is not None:
        #     return AIResponse(content=cached_response)

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                **kwargs,
            )
            result = response.model_dump()

            # Cache the result
            self.cache.set(
                cache_key,
                result["choices"][0]["message"]["content"],
                ttl=self.default_ttl,
            )
            return AIResponse(
                content=result["choices"][0]["message"]["content"], raw_response=result
            )
        except Exception as e:
            logger.error(f"Error in chat completion: {str(e)}")
            raise

    async def embedding(self, text: str, thread_id: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text, thread_id)

        try:
            response = await self.client.embeddings.create(
                model="text-embedding-ada-002", input=text
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
        thread_id: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> AIResponse:
        cache_key = self._generate_cache_key(thread_id, **kwargs)

        # # Try to get from cache first
        # cached_response = self.cache.get(cache_key)
        # if cached_response is not None:
        #     return AIResponse(content=cached_response)

        try:
            response = await self.client.chat(
                model=self.model,
                messages=messages,
                options={
                    "temperature": temperature,
                    **({"num_predict": max_tokens} if max_tokens else {}),
                },
            )

            # Cache the result
            self.cache.set(
                cache_key, response["message"]["content"], ttl=self.default_ttl
            )
            return AIResponse(
                content=response["message"]["content"], raw_response=response
            )
        except Exception as e:
            logger.error(f"Error in Ollama chat completion: {str(e)}")
            raise

    async def embedding(self, text: str, thread_id: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text, thread_id)

        try:
            response = await self.client.embeddings(
                model=self.model,
                prompt=text,
            )

            # Cache the result
            self.cache.set(cache_key, response["embeddings"], ttl=self.default_ttl)
            return response["embeddings"]
        except Exception as e:
            logger.error(f"Error in Ollama embedding: {str(e)}")
            raise


class CustomAIClient(BaseAIClient):
    def __init__(self, api_key: str, model: str, api_base: str):
        super().__init__(api_key=api_key, model=model, api_base=api_base)
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        }

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        thread_id: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = 4000,
        **kwargs,
    ) -> AIResponse:
        cache_key = self._generate_cache_key(thread_id, **kwargs)

        # # Try to get from cache first
        # cached_response = self.cache.get(cache_key)
        # if cached_response is not None:
        #     return AIResponse(content=cached_response)

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_base}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": self.model,
                        "messages": messages,
                        "inferenceConfig": {
                            "temperature": temperature,
                            "maxTokens": max_tokens or 4000,
                            **kwargs,
                        },
                    },
                )
                response.raise_for_status()
                result = response.json()

            # Cache the result
            self.cache.set(
                cache_key,
                result["choices"][0]["message"]["content"],
                ttl=self.default_ttl,
            )
            return AIResponse(
                content=result["choices"][0]["message"]["content"], raw_response=result
            )
        except Exception as e:
            logger.error(f"Error in chat completion: {str(e)}")
            raise

    async def embedding(self, text: str, thread_id: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text, thread_id)

        try:
            response = await self.client.embeddings.create(model=self.model, input=text)
            embedding = response.data[0].embedding

            # Cache the result
            self.cache.set(cache_key, embedding, ttl=self.default_ttl)
            return embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {str(e)}")
            raise


class BedrockClient(BaseAIClient):
    def __init__(
        self,
        aws_region: str,
        model: str = "anthropic.claude-v2",
        aws_access_key_id: Optional[str] = None,
        aws_secret_access_key: Optional[str] = None,
    ):
        super().__init__(model=model)
        self.client = boto3.client(
            service_name="bedrock-runtime",
            region_name=aws_region.lower(),  # boto3 expects lowercase region
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        thread_id: str,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> AIResponse:
        cache_key = self._generate_cache_key(thread_id, **kwargs)

        # # Try to get from cache first
        # cached_response = self.cache.get(cache_key)
        # if cached_response is not None:
        #     return AIResponse(content=cached_response)

        try:
            # Check if using Claude 3
            if "claude-3" in self.model:
                # Use Messages API format for Claude 3
                body = {
                    "anthropic_version": "bedrock-2023-05-31",
                    "messages": messages,
                    "max_tokens": max_tokens or 4000,
                    "temperature": temperature,
                    **kwargs,
                }
            else:
                # Convert messages to Anthropic Claude format for older models
                prompt = ""
                for msg in messages:
                    role = msg["role"]
                    content = msg["content"]
                    if role == "system":
                        prompt += f"System: {content}\n\n"
                    elif role == "user":
                        prompt += f"Human: {content}\n\n"
                    elif role == "assistant":
                        prompt += f"Assistant: {content}\n\n"

                prompt += "Assistant: "

                body = {
                    "prompt": prompt,
                    "max_tokens_to_sample": max_tokens or 4000,
                    "temperature": temperature,
                    **kwargs,
                }

            response = self.client.invoke_model(
                modelId=self.model, body=json.dumps(body)
            )

            response_body = json.loads(response.get("body").read())

            # Handle different response formats
            if "claude-3" in self.model:
                content = response_body.get("content", [{}])[0].get("text", "")
            else:
                content = response_body.get("completion", "")

            # Cache the result
            self.cache.set(cache_key, content, ttl=self.default_ttl)
            return AIResponse(content=content, raw_response=response_body)
        except Exception as e:
            logger.error(f"Error in Bedrock chat completion: {str(e)}")
            raise

    async def embedding(self, text: str, thread_id: str) -> List[float]:
        cache_key = self._generate_embedding_cache_key(text, thread_id)

        try:
            body = {"inputText": text}

            response = self.client.invoke_model(
                modelId="amazon.titan-embed-text-v1", body=json.dumps(body)
            )

            response_body = json.loads(response.get("body").read())
            embedding = response_body.get("embedding", [])

            # Cache the result
            self.cache.set(cache_key, embedding, ttl=self.default_ttl)
            return embedding
        except Exception as e:
            logger.error(f"Error in Bedrock embedding: {str(e)}")
            raise


class AIClientFactory:
    @staticmethod
    def create_client(
        provider: AIProvider,
        api_key: str = None,
        model: str = None,
        api_base: Optional[str] = None,
        aws_region: Optional[str] = None,
        aws_access_key_id: Optional[str] = None,
        aws_secret_access_key: Optional[str] = None,
    ) -> BaseAIClient:
        if provider == AIProvider.OPENAI:
            if not api_key:
                raise ValueError("API key is required for OpenAI")
            return OpenAIClient(api_key=api_key, model=model or "gpt-4")
        elif provider == AIProvider.OLLAMA:
            return OllamaClient(
                model=model or "llama3.2", api_base=api_base or "http://localhost:11434"
            )
        elif provider == AIProvider.CUSTOM:
            if not api_key:
                raise ValueError("API key is required for custom provider")
            return CustomAIClient(api_key=api_key, model=model, api_base=api_base)
        elif provider == AIProvider.BEDROCK:
            if not aws_region:
                raise ValueError("AWS region is required for Bedrock")
            return BedrockClient(
                aws_region=aws_region,
                model=model or "anthropic.claude-v2",
                aws_access_key_id=aws_access_key_id,
                aws_secret_access_key=aws_secret_access_key,
            )
        else:
            raise ValueError(f"Unsupported AI provider: {provider}")
