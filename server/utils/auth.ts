import crypto from "node:crypto";
import type { H3Event } from "h3";
import prisma from "~~/lib/prisma";

const JWT_SECRET =
  process.env.JWT_SECRET || "super-secret-key-fallback-lomba-cv-2026";

// Hashing Utilities
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
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

  const hmac = crypto.createHmac("sha256", JWT_SECRET);
  hmac.update(`${encodedHeader}.${encodedPayload}`);
  const expectedSignature = hmac
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (signature !== expectedSignature) {
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
