import os
import json
import pickle
import logging
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from typing import Any, Optional, Union
from pathlib import Path

logger = logging.getLogger(__name__)

class CacheBackend(ABC):
    """Abstract base class for cache backends"""
    
    @abstractmethod
    def get(self, key: str) -> Optional[Any]:
        """Retrieve a value from cache"""
        pass
    
    @abstractmethod
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Store a value in cache with optional TTL in seconds"""
        pass
    
    @abstractmethod
    def delete(self, key: str) -> bool:
        """Delete a value from cache"""
        pass
    
    @abstractmethod
    def clear(self) -> bool:
        """Clear all values from cache"""
        pass

class RedisCache(CacheBackend):
    """Redis-based cache implementation"""
    
    def __init__(self, host: str = "redis", port: int = 6379, db: int = 0):
        try:
            import redis
            self.client = redis.Redis(host=host, port=port, db=db)
            self.client.ping()  # Test connection
            logger.info("Redis cache initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Redis cache: {str(e)}")
            raise
    
    def get(self, key: str) -> Optional[Any]:
        try:
            value = self.client.get(key)
            if value:
                return pickle.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error retrieving from Redis cache: {str(e)}")
            return None
    
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        try:
            serialized = pickle.dumps(value)
            if ttl:
                return bool(self.client.setex(key, ttl, serialized))
            return bool(self.client.set(key, serialized))
        except Exception as e:
            logger.error(f"Error setting Redis cache: {str(e)}")
            return False
    
    def delete(self, key: str) -> bool:
        try:
            return bool(self.client.delete(key))
        except Exception as e:
            logger.error(f"Error deleting from Redis cache: {str(e)}")
            return False
    
    def clear(self) -> bool:
        try:
            return bool(self.client.flushdb())
        except Exception as e:
            logger.error(f"Error clearing Redis cache: {str(e)}")
            return False

class LocalCache(CacheBackend):
    """File-based local cache implementation"""
    
    def __init__(self, cache_dir: str = ".cache"):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Local cache initialized at {self.cache_dir}")
    
    def _get_cache_path(self, key: str) -> Path:
        """Get the file path for a cache key"""
        return self.cache_dir / f"{key}.cache"
    
    def get(self, key: str) -> Optional[Any]:
        try:
            cache_file = self._get_cache_path(key)
            if not cache_file.exists():
                return None
                
            with open(cache_file, 'rb') as f:
                metadata = pickle.load(f)
                
                # Check expiration
                if 'expires_at' in metadata and metadata['expires_at'] < datetime.now():
                    self.delete(key)
                    return None
                
                return metadata.get('value')
        except Exception as e:
            logger.error(f"Error retrieving from local cache: {str(e)}")
            return None
    
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        try:
            cache_file = self._get_cache_path(key)
            metadata = {
                'value': value,
                'created_at': datetime.now(),
                'expires_at': datetime.now() + timedelta(seconds=ttl) if ttl else None
            }
            
            with open(cache_file, 'wb') as f:
                pickle.dump(metadata, f)
            return True
        except Exception as e:
            logger.error(f"Error setting local cache: {str(e)}")
            return False
    
    def delete(self, key: str) -> bool:
        try:
            cache_file = self._get_cache_path(key)
            if cache_file.exists():
                cache_file.unlink()
            return True
        except Exception as e:
            logger.error(f"Error deleting from local cache: {str(e)}")
            return False
    
    def clear(self) -> bool:
        try:
            for cache_file in self.cache_dir.glob("*.cache"):
                cache_file.unlink()
            return True
        except Exception as e:
            logger.error(f"Error clearing local cache: {str(e)}")
            return False

class CacheManager:
    """
    Cache manager that provides a unified interface for caching operations
    
    Usage:
        # Initialize cache manager
        cache = CacheManager()
        
        # Store value with TTL
        cache.set("my_key", {"data": "value"}, ttl=3600)
        
        # Retrieve value
        value = cache.get("my_key")
        
        # Delete value
        cache.delete("my_key")
        
        # Clear all cache
        cache.clear()
        
        # Use decorator for function results caching
        @cache.cached(ttl=3600)
        def expensive_operation(arg1, arg2):
            return some_expensive_computation(arg1, arg2)
    """
    
    def __init__(self):
        self.backend = self._initialize_backend()
    
    def _initialize_backend(self) -> CacheBackend:
        """Initialize the appropriate cache backend based on environment"""
        use_redis = os.getenv("USE_REDIS", "false").lower() == "true"
        
        if use_redis:
            try:
                redis_host = os.getenv("REDIS_HOST", "redis")
                redis_port = int(os.getenv("REDIS_PORT", "6379"))
                redis_db = int(os.getenv("REDIS_DB", "0"))
                return RedisCache(host=redis_host, port=redis_port, db=redis_db)
            except Exception as e:
                logger.warning(f"Failed to initialize Redis cache, falling back to local cache: {str(e)}")
                return LocalCache()
        return LocalCache()
    
    def get(self, key: str) -> Optional[Any]:
        """Retrieve a value from cache"""
        return self.backend.get(key)
    
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Store a value in cache with optional TTL in seconds"""
        return self.backend.set(key, value, ttl)
    
    def delete(self, key: str) -> bool:
        """Delete a value from cache"""
        return self.backend.delete(key)
    
    def clear(self) -> bool:
        """Clear all values from cache"""
        return self.backend.clear()
    
    def cached(self, ttl: Optional[int] = None):
        """
        Decorator for caching function results
        
        Args:
            ttl: Time to live in seconds for cached results
            
        Example:
            @cache.cached(ttl=3600)
            def expensive_operation(arg1, arg2):
                return some_expensive_computation(arg1, arg2)
        """
        def decorator(func):
            def wrapper(*args, **kwargs):
                # Create a unique cache key based on function name and arguments
                key_parts = [
                    func.__name__,
                    str(args),
                    str(sorted(kwargs.items()))
                ]
                cache_key = "func_" + "_".join(key_parts)
                
                # Try to get from cache
                result = self.get(cache_key)
                if result is not None:
                    return result
                
                # If not in cache, compute and store
                result = func(*args, **kwargs)
                self.set(cache_key, result, ttl)
                return result
            return wrapper
        return decorator 