import crypto from "node:crypto";

let generatedKey: Buffer | null = null;

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
 * Resolves APP_KEY first, falling back to JWT_SECRET, or generating a random key in production.
 * Parses APP_PREVIOUS_KEYS as a comma-separated list of fallback keys.
 */
export function getAppKeys(): { key: Buffer; previous: Buffer[] } {
  let appKeyRaw = process.env.APP_KEY || process.env.JWT_SECRET;

  if (!appKeyRaw) {
    if (process.env.NODE_ENV === "production") {
      if (!generatedKey) {
        console.warn(
          "WARNING: Neither APP_KEY nor JWT_SECRET environment variables are set. Generating a random key for session signing and encryption.",
        );
        generatedKey = crypto.randomBytes(32);
      }
      return { key: generatedKey, previous: [] };
    }
    // Development fallback
    appKeyRaw = "base64:dGhpcy1pcy1hLTMyLWNoYXJhY3Rlci1rZXktMTIzNA==";
  }

  const key = parseKey(appKeyRaw);
  const previousRaw = process.env.APP_PREVIOUS_KEY || "";
  const previous = previousRaw.trim() ? [parseKey(previousRaw.trim())] : [];

  return { key, previous };
}
