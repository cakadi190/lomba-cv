import crypto from "node:crypto";

/**
 * Parses an environment key string into a Buffer.
 * Supports base64 prefixed keys (e.g. 'base64:...') or raw utf-8 strings.
 * Hashes the result to exactly 32 bytes (256-bit) to be fully compatible with AES-256-CBC.
 */
function parseKey(keyStr: string): Buffer {
  let keyBuf: Buffer;
  if (keyStr.startsWith("base64:")) {
    keyBuf = Buffer.from(keyStr.slice(7), "base64");
  } else {
    keyBuf = Buffer.from(keyStr, "utf-8");
  }

  if (keyBuf.length !== 32) {
    keyBuf = crypto.createHash("sha256").update(keyBuf).digest();
  }
  return keyBuf;
}

/**
 * Retrieves the application keys for encryption and signing.
 * Resolves APP_KEY first, falling back to JWT_SECRET.
 * Parses APP_PREVIOUS_KEYS as a comma-separated list of fallback keys.
 *
 * Deliberately does NOT fall back to a randomly generated key in production:
 * a key that changes across restarts silently invalidates every existing
 * "auth_token" cookie (including remembered 30-day sessions), forcing every
 * user to log in again. Failing fast at boot surfaces a misconfigured
 * deployment immediately instead of as a mysterious logout bug.
 */
export function getAppKeys(): { key: Buffer; previous: Buffer[] } {
  let appKeyRaw = process.env.APP_KEY || process.env.JWT_SECRET;

  if (!appKeyRaw) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "APP_KEY (or JWT_SECRET) is not set. Refusing to start with an auto-generated key, " +
          "since that would invalidate every session on each restart. Set APP_KEY in the " +
          "environment (see `bun run key:generate`) — for Docker, make sure the .env file with " +
          "APP_KEY exists on the host and is picked up via `env_file` in compose.yaml.",
      );
    }
    // Development fallback
    appKeyRaw = "base64:dGhpcy1pcy1hLTMyLWNoYXJhY3Rlci1rZXktMTIzNA==";
  }

  const key = parseKey(appKeyRaw);
  const previousRaw = process.env.APP_PREVIOUS_KEY || "";
  const previous = previousRaw.trim() ? [parseKey(previousRaw.trim())] : [];

  return { key, previous };
}
