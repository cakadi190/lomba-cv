import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { slug },
    });

    if (!portfolios || portfolios.length === 0) {
      return { code: 404, message: "Educations not found" };
    }

    return { code: 200, data: portfolios };
  } catch (error) {
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
