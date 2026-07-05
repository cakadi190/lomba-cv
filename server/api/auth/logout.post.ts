import { logger } from "~~/lib/pino";
import { deleteAuthCookie } from "~~/server/utils/auth";

export default defineEventHandler((event) => {
  try {
    deleteAuthCookie(event);

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
