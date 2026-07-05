import { logger } from "~~/lib/pino";
import { Auth } from "~~/server/lib/facades/auth";

export default defineEventHandler(async (event) => {
  try {
    const user = await Auth.guard(event).user();

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthenticated",
      });
    }

    return {
      code: 200,
      data: user,
    };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "statusCode" in error &&
      error.statusCode === 401
    ) {
      throw error;
    }
    logger.error(
      { err: error },
      "Terjadi kesalahan pada proses check session (me)",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
