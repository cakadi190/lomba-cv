import { deleteCookie, type H3Event, parseCookies, setCookie } from "h3";
import { Crypt } from "./crypt";

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  domain?: string;
  path?: string;
  sameSite?: true | false | "lax" | "strict" | "none";
  encrypt?: boolean;
}

/**
 * Laravel-style Cookie Facade.
 * Automatically encrypts cookies on write and decrypts them on read.
 */
export const Cookie = {
  /**
   * Set a cookie value on the response.
   *
   * @param event - The H3 event.
   * @param name - The cookie name.
   * @param value - The cookie value (can be object, array, string, number, etc).
   * @param options - Additional options.
   */
  set(
    event: H3Event,
    name: string,
    value: unknown,
    options: CookieOptions = {},
  ): void {
    const shouldEncrypt = options.encrypt !== false;
    const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
    const finalValue = shouldEncrypt ? Crypt.encrypt(stringValue) : stringValue;
    
    const { encrypt, ...h3Options } = options;
    setCookie(event, name, finalValue, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...h3Options,
    });
  },

  /**
   * Queue a cookie to be set on the response (alias for set).
   *
   * @param event - The H3 event.
   * @param name - The cookie name.
   * @param value - The cookie value.
   * @param options - Additional options.
   */
  queue(
    event: H3Event,
    name: string,
    value: unknown,
    options: CookieOptions = {},
  ): void {
    this.set(event, name, value, options);
  },

  /**
   * Get a cookie value from the request.
   *
   * @param event - The H3 event.
   * @param name - The cookie name.
   * @param decrypt - Whether to decrypt the value (defaults to true).
   * @returns The decrypted cookie value or null if not found/decryption fails.
   */
  get(event: H3Event, name: string, decrypt = true): unknown {
    const cookies = parseCookies(event);
    const rawValue = cookies[name];
    if (!rawValue) {
      return null;
    }
    
    if (!decrypt) {
      return rawValue;
    }
    
    try {
      const decrypted = Crypt.decrypt(rawValue);
      // Attempt to parse if it is JSON serialized, otherwise return as string
      if (typeof decrypted === "string") {
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }
      return decrypted;
    } catch {
      // Fallback for existing unencrypted JWT cookies during transition/rotation
      if (rawValue.split(".").length === 3) {
        return rawValue;
      }
      return null;
    }
  },

  /**
   * Check if a cookie exists on the request.
   *
   * @param event - The H3 event.
   * @param name - The cookie name.
   * @returns True if the cookie exists, false otherwise.
   */
  has(event: H3Event, name: string): boolean {
    const cookies = parseCookies(event);
    return cookies[name] !== undefined;
  },

  /**
   * Remove a cookie from the response.
   *
   * @param event - The H3 event.
   * @param name - The cookie name.
   * @param options - Additional options (must match domain/path used when set).
   */
  forget(event: H3Event, name: string, options: Omit<CookieOptions, "encrypt"> = {}): void {
    deleteCookie(event, name, {
      path: "/",
      ...options,
    });
  }
};
