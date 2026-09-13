import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  try {
    const portfolio = await db.orm.portfolios.where({ slug }).first();

    if (!portfolio) {
      throw createError({
        statusCode: 404,
        statusMessage: "Portfolio not found",
      });
    }

    return { code: 200, data: portfolio };
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
      { err: error, slug },
      "Terjadi kesalahan saat mengambil data portofolio berdasarkan slug",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
