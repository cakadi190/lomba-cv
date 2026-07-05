import Redis from "ioredis";

let redisClient: Redis | null = null;

/**
 * Initialize and resolve the Redis client instance.
 * Supports both Nuxt runtimeConfig and direct environment variable fallback (for scripts).
 */
export function getRedisClient(): Redis {
  if (!redisClient) {
    let redisUrl = "";
    try {
      const config = useRuntimeConfig();
      redisUrl = config.redis?.url || "";
    } catch {
      // Called outside of Nuxt server context (e.g., seeding, CLI script)
    }

    // Fallback to process.env.REDIS_URL if not resolved via runtimeConfig
    if (!redisUrl) {
      redisUrl = process.env.REDIS_URL || "";
    }

    if (!redisUrl) {
      throw new Error("REDIS_URL is not configured.");
    }

    redisClient = new Redis(redisUrl);

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }
  return redisClient;
}
