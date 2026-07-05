import { logger } from "~~/lib/pino";
import { Auth } from "~~/server/lib/facades/auth";

export default defineEventHandler((event) => {
  try {
    Auth.guard(event).logout();

    logger.info("User berhasil logout");

    return {
      code: 200,
      message: "Logged out successfully",
    };
  } catch (error) {
    logger.error({ err: error }, "Terjadi kesalahan pada proses logout");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
