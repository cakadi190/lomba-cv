import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const education = await prisma.education.findUnique({
      where: { id },
    });

    if (!education) {
      throw createError({
        statusCode: 404,
        statusMessage: "Education not found",
      });
    }

    return { code: 200, data: education };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "statusCode" in error &&
      error.statusCode === 404
    ) {
      throw error;
    }
    logger.error(
      { err: error, id },
      "Terjadi kesalahan saat mengambil data education berdasarkan ID",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
