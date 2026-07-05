import crypto from "node:crypto";
import { getAppKeys } from "./keys";

/**
 * Exception thrown when decryption fails or the payload is invalid.
 */
export class DecryptException extends Error {
  constructor(message = "The payload is invalid.") {
    super(message);
    this.name = "DecryptException";
  }
}

/**
 * Crypt helper providing secure AES-256-CBC encryption and decryption.
 * Similar to Laravel's Encrypter. Supports key rotation via APP_PREVIOUS_KEYS.
 */
export const Crypt = {
  /**
   * Encrypt the given value.
   *
   * @param value - The value to encrypt (can be object, string, number, etc).
   * @returns The base64-encoded encrypted payload containing iv, value, and mac.
   */
  encrypt(value: unknown): string {
    const { key } = getAppKeys();

    // Serialize if object, otherwise convert to string
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(stringValue, "utf8", "base64");
    encrypted += cipher.final("base64");

    const ivBase64 = iv.toString("base64");

    // Generate MAC: SHA256 of IV + Encrypted Value
    const mac = crypto
      .createHmac("sha256", key)
      .update(ivBase64 + encrypted)
      .digest("hex");

    const payload = {
      iv: ivBase64,
      value: encrypted,
      mac,
    };

    return Buffer.from(JSON.stringify(payload)).toString("base64");
  },

  /**
   * Decrypt the given payload.
   *
   * @param payloadStr - The base64-encoded payload to decrypt.
   * @returns The decrypted value.
   * @throws {DecryptException} If decryption fails or the MAC is invalid.
   */
  decrypt(payloadStr: string): unknown {
    const { key, previous } = getAppKeys();
    const allKeys = [key, ...previous];

    let payload: { iv: string; value: string; mac: string };
    try {
      const decoded = Buffer.from(payloadStr, "base64").toString("utf8");
      payload = JSON.parse(decoded);
      if (!payload.iv || !payload.value || !payload.mac) {
        throw new Error();
      }
    } catch {
      throw new DecryptException("The payload is invalid.");
    }

    // Try each key in sequence (rotation support)
    for (const currentKey of allKeys) {
      // Recalculate MAC and compare timing-safely
      const expectedMac = crypto
        .createHmac("sha256", currentKey)
        .update(payload.iv + payload.value)
        .digest("hex");

      const macBuf = Buffer.from(payload.mac, "hex");
      const expectedMacBuf = Buffer.from(expectedMac, "hex");

      if (
        macBuf.length === expectedMacBuf.length &&
        crypto.timingSafeEqual(macBuf, expectedMacBuf)
      ) {
        try {
          const iv = Buffer.from(payload.iv, "base64");
          const decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            currentKey,
            iv,
          );
          let decrypted = decipher.update(payload.value, "base64", "utf8");
          decrypted += decipher.final("utf8");

          // Attempt to parse JSON if it is a serialized object/array
          try {
            return JSON.parse(decrypted);
          } catch {
            return decrypted;
          }
        } catch {}
      }
    }

    throw new DecryptException("The MAC is invalid or decryption failed.");
  },

  /**
   * Encrypt the given string value without any extra serialization.
   *
   * @param value - The string to encrypt.
   * @returns The base64-encoded encrypted payload.
   */
  encryptString(value: string): string {
    return this.encrypt(value);
  },

  /**
   * Decrypt the given payload and return as a string.
   *
   * @param payloadStr - The base64-encoded payload.
   * @returns The decrypted string.
   * @throws {DecryptException}
   */
  decryptString(payloadStr: string): string {
    const decrypted = this.decrypt(payloadStr);
    return typeof decrypted === "string"
      ? decrypted
      : JSON.stringify(decrypted);
  },
};
