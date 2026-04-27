import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Fallback in-memory store if Redis is not configured
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(identifier: string, limit: number = 5, windowSeconds: number = 60) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      });

      const { success, pending, limit: max, reset, remaining } = await ratelimit.limit(identifier);
      return { success, remaining, reset };
    } catch (e) {
      console.warn("Redis rate limiter failed, falling back to in-memory", e);
    }
  }

  // Fallback in-memory rate limiting
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  
  let record = inMemoryStore.get(identifier);
  
  if (!record || record.resetAt < now) {
    record = { count: 1, resetAt: now + windowMs };
  } else {
    record.count++;
  }
  
  inMemoryStore.set(identifier, record);
  
  return {
    success: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    reset: record.resetAt
  };
}
