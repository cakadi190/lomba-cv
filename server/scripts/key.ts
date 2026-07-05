import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");

/**
 * Reads the content of the .env file.
 */
function readEnv(): string {
  if (!fs.existsSync(envPath)) {
    return "";
  }
  return fs.readFileSync(envPath, "utf8");
}

/**
 * Writes content to the .env file.
 */
function writeEnv(content: string): void {
  fs.writeFileSync(envPath, content, "utf8");
}

/**
 * Updates or sets a variable in .env content.
 */
function setEnvVar(content: string, key: string, value: string): string {
  const regex = new RegExp(`^${key}=(.*)$`, "m");
  if (regex.test(content)) {
    return content.replace(regex, `${key}=${value}`);
  }
  // Append if not found
  return content.endsWith("\n")
    ? `${content}${key}=${value}\n`
    : `${content}\n${key}=${value}\n`;
}

/**
 * Retrieves a variable value from .env content.
 */
function getEnvVar(content: string, key: string): string {
  const regex = new RegExp(`^${key}=(.*)$`, "m");
  const match = content.match(regex);
  return match?.[1]?.trim() ?? "";
}

/**
 * Generate a cryptographically secure 32-byte key formatted as base64.
 */
function generateKey(): string {
  const bytes = crypto.randomBytes(32);
  return `base64:${bytes.toString("base64")}`;
}

/**
 * Handles the 'generate' command.
 */
function handleGenerate(): void {
  const shouldRotate = process.argv.includes("--rotate");
  let env = readEnv();

  if (!env) {
    console.warn("⚠️  .env file not found. Creating a new one...");
  }

  const oldKey = getEnvVar(env, "APP_KEY");
  const newKey = generateKey();

  if (shouldRotate && oldKey) {
    env = setEnvVar(env, "APP_PREVIOUS_KEY", oldKey);
    console.log(
      `🔄 Key rotation enabled: Shifting current primary key to APP_PREVIOUS_KEY.`,
    );
  }

  env = setEnvVar(env, "APP_KEY", newKey);
  writeEnv(env);

  console.log(`✅ Application key [${newKey}] set successfully.`);
}

/**
 * Handles the 'show' command.
 */
function handleShow(): void {
  const env = readEnv();
  const key = getEnvVar(env, "APP_KEY");
  if (!key) {
    console.log("❌ APP_KEY is not set in the .env file.");
  } else {
    console.log(`APP_KEY: ${key}`);
  }
}

/**
 * Handles the 'status' command.
 */
function handleStatus(): void {
  const env = readEnv();
  const key = getEnvVar(env, "APP_KEY");
  const previous = getEnvVar(env, "APP_PREVIOUS_KEY");

  console.log("=== APPLICATION KEY STATUS ===");
  if (!key) {
    console.log("Status: ❌ NOT SET");
  } else {
    console.log("Status: ✅ SET");
    console.log(`Primary Key: ${key}`);

    // Check decrypted length
    let rawLength = key.length;
    if (key.startsWith("base64:")) {
      try {
        const decoded = Buffer.from(key.slice(7), "base64");
        rawLength = decoded.length;
      } catch {
        // parsing failed
      }
    }
    console.log(`Primary Key Length: ${rawLength} bytes`);
    if (rawLength === 32) {
      console.log("Key Security: ✅ SECURE (256-bit)");
    } else {
      console.log(
        "Key Security: ⚠️  INSECURE (Should be exactly 32 bytes for AES-256)",
      );
    }
  }

  console.log("\n=== ROTATION LOGS ===");
  if (previous) {
    console.log(`Rotated Key (Previous): ${previous}`);
  } else {
    console.log("Rotated Key (Previous): None");
  }
}

/**
 * Handles the 'rotate-fix' command.
 */
function handleRotateFix(): void {
  let env = readEnv();
  env = setEnvVar(env, "APP_PREVIOUS_KEY", "");
  writeEnv(env);
  console.log(
    "✅ Previous application key (APP_PREVIOUS_KEY) cleared successfully.",
  );
}

const command = process.argv[2];

switch (command) {
  case "generate":
    handleGenerate();
    break;
  case "show":
    handleShow();
    break;
  case "status":
    handleStatus();
    break;
  case "rotate-fix":
    handleRotateFix();
    break;
  default:
    console.log(
      "Usage: tsx server/scripts/key.ts [generate [--rotate] | show | status | rotate-fix]",
    );
    process.exit(1);
}
