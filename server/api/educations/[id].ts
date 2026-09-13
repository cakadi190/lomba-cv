import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const education = await db.orm.educations.where({ _id: id }).first();

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
