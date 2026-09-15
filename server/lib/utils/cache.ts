import Redis from "ioredis";

let redisClient: Redis | null = null;

/**
 * Initialize and resolve the Redis client instance.
 * Supports both Nuxt runtimeConfig and direct environment variable fallback (for scripts).
 */
export function getRedisClient(): Redis {
  // retryStrategy below gives up after a few attempts and leaves the
  // client permanently in "end" status — recreate it instead of reusing
  // a dead connection for the rest of the process lifetime.
  if (redisClient && redisClient.status === "end") {
    redisClient = null;
  }

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

    redisClient = new Redis(redisUrl, {
      // Redis is a cache, not a source of truth: fail fast instead of
      // hanging requests for tens of seconds (default maxRetriesPerRequest
      // is 20 with growing backoff) when Redis is unreachable.
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      enableOfflineQueue: false,
      retryStrategy(times) {
        if (times > 3) return null;
        return Math.min(times * 200, 1000);
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  }
  return redisClient;
}
