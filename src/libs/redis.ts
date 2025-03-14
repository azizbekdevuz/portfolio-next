import { Redis } from 'ioredis';

// Create a singleton Redis client
let redis: Redis | null = null;

export function getRedisClient() {
  if (!redis) {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    redis = new Redis(url);
  }
  return redis;
}

// Generic caching function
export async function getWithCache<T>(
  key: string, 
  fetchFn: () => Promise<T>, 
  expiryInSeconds = 3600
): Promise<T> {
  const redis = getRedisClient();
  
  try {
    // Try to get from cache first
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log(`Cache hit: ${key}`);
      return JSON.parse(cachedData) as T;
    }
    
    // If not in cache, fetch and store
    console.log(`Cache miss: ${key}`);
    const data = await fetchFn();
    await redis.set(key, JSON.stringify(data), 'EX', expiryInSeconds);
    return data;
  } catch (error) {
    console.error('Redis error:', error);
    // Fallback to direct fetch if cache fails
    return fetchFn();
  }
}