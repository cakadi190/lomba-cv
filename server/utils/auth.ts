import crypto from "node:crypto";
import { deleteCookie, type H3Event, parseCookies, setCookie } from "h3";
import prisma from "~~/lib/prisma";

let JWT_SECRET: string;
const rawSecret = process.env.JWT_SECRET;
if (rawSecret) {
  JWT_SECRET = rawSecret;
} else {
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "WARNING: JWT_SECRET environment variable is not set. Generating a random secret for session signing to secure the application.",
    );
    JWT_SECRET = crypto.randomBytes(32).toString("hex");
  } else {
    JWT_SECRET = "default-super-secret-key-fallback-lomba-cv-2026";
  }
}

// Hashing Utilities
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 210000; // OWASP recommendation for PBKDF2-HMAC-SHA512
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("hex");
  return `${salt}:${iterations}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  let salt: string | undefined;
  let originalHash: string | undefined;
  let iterations = 1000; // Default iteration count for legacy hashes

  if (parts.length === 3) {
    salt = parts[0];
    iterations = parseInt(parts[1] || "", 10);
    originalHash = parts[2];
  } else if (parts.length === 2) {
    salt = parts[0];
    originalHash = parts[1];
  } else {
    return false;
  }

  if (!salt || !originalHash || Number.isNaN(iterations)) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("hex");

  // Timing-safe comparison to prevent timing attacks
  const hashBuf = Buffer.from(hash, "hex");
  const originalHashBuf = Buffer.from(originalHash, "hex");

  if (hashBuf.length !== originalHashBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(hashBuf, originalHashBuf);
}

// Base64URL Encoding Utilities
function base64urlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

// Custom JWT sign and verify (HMAC-SHA256)
export function signToken(
  payload: Record<string, unknown>,
  expiresInSeconds: number = 7 * 24 * 60 * 60,
): string {
  const header = { alg: "HS256", typ: "JWT" };
  const expPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(expPayload));

  const hmac = crypto.createHmac("sha256", JWT_SECRET);
  hmac.update(`${encodedHeader}.${encodedPayload}`);
  const signature = hmac
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  if (!encodedHeader || !encodedPayload || !signature) {
    return null;
  }

  const hmac = crypto.createHmac("sha256", JWT_SECRET);
  hmac.update(`${encodedHeader}.${encodedPayload}`);
  const expectedSignature = hmac
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const signatureBuf = Buffer.from(signature);
  const expectedSignatureBuf = Buffer.from(expectedSignature);

  if (signatureBuf.length !== expectedSignatureBuf.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuf, expectedSignatureBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64urlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired token
    }
    return payload;
  } catch {
    return null;
  }
}

// Request Auth Helper
export async function getAuthenticatedUser(event: H3Event) {
  const cookies = parseCookies(event);
  const token = cookies.auth_token;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (typeof decoded?.userId !== "string") return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
    },
  });

  return user;
}

// Cookie Auth Helpers
export function setAuthCookie(
  event: H3Event,
  token: string,
  remember: boolean = false,
) {
  const maxAge = remember ? 30 * 24 * 60 * 60 : undefined; // 30 days or session cookie
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
}

export function deleteAuthCookie(event: H3Event) {
  deleteCookie(event, "auth_token", {
    path: "/",
  });
}
