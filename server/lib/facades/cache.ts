import type Redis from "ioredis";
import { getRedisClient } from "../utils/cache";

/**
 * Laravel-style Cache Facade using Redis under the hood.
 */
// biome-ignore lint/complexity/noStaticOnlyClass: Class is a static-only facade
export class Cache {
  /**
   * Get the underlying raw Redis client instance.
   */
  static client(): Redis {
    return getRedisClient();
  }

  /**
   * Retrieve an item from the cache by key.
   *
   * @param key - The cache key.
   * @param defaultValue - The default value to return if the key does not exist.
   */
  static async get<T>(
    key: string,
    defaultValue: T | null = null,
  ): Promise<T | null> {
    let value: string | null;
    try {
      value = await Cache.client().get(key);
    } catch (err) {
      // Cache is best-effort: a Redis outage must not fail the caller.
      console.error("Cache.get failed, treating as cache miss:", err);
      return defaultValue;
    }
    if (value === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  /**
   * Store an item in the cache.
   *
   * @param key - The cache key.
   * @param value - The value to store.
   * @param ttl - The Time To Live (expiration) in seconds.
   */
  static async put(key: string, value: unknown, ttl?: number): Promise<void> {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    try {
      if (ttl !== undefined && ttl !== null) {
        await Cache.client().set(key, stringValue, "EX", ttl);
      } else {
        await Cache.client().set(key, stringValue);
      }
    } catch (err) {
      // Best-effort: failing to warm the cache should not fail the request.
      console.error("Cache.put failed, skipping cache write:", err);
    }
  }

  /**
   * Store an item in the cache (alias for put).
   */
  static async set(key: string, value: unknown, ttl?: number): Promise<void> {
    await Cache.put(key, value, ttl);
  }

  /**
   * Determine if an item exists in the cache.
   */
  static async has(key: string): Promise<boolean> {
    const exists = await Cache.client().exists(key);
    return exists > 0;
  }

  /**
   * Remove an item from the cache.
   */
  static async forget(key: string): Promise<boolean> {
    const deleted = await Cache.client().del(key);
    return deleted > 0;
  }

  /**
   * Remove an item from the cache (alias for forget).
   */
  static async delete(key: string): Promise<boolean> {
    return Cache.forget(key);
  }

  /**
   * Get an item from the cache, or execute the given callback and store the result.
   *
   * @param key - The cache key.
   * @param ttl - Time to live in seconds.
   * @param callback - The async callback function returning the fresh value.
   */
  static async remember<T>(
    key: string,
    ttl: number | null,
    callback: () => Promise<T>,
  ): Promise<T> {
    const value = await Cache.get<T>(key);
    if (value !== null) {
      return value;
    }

    const freshValue = await callback();
    await Cache.put(key, freshValue, ttl ?? undefined);
    return freshValue;
  }

  /**
   * Get an item from the cache, or execute the given callback and store the result indefinitely.
   */
  static async rememberForever<T>(
    key: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    return Cache.remember(key, null, callback);
  }

  /**
   * Wipe all keys from the current Redis database.
   */
  static async flush(): Promise<void> {
    await Cache.client().flushdb();
  }
}
