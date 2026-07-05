import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Math.max(1, parseInt(query?.page as string, 10) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(query?.perPage as string, 10) || 3),
    );
    const skip = (page - 1) * perPage || 0;

    const cacheKey = `educations:list:page:${page}:perPage:${perPage}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      const educations = await prisma.education.findMany({
        skip,
        take: perPage,
        orderBy: {
          start: "desc",
        },
      });

      return { code: 200, data: educations };
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan saat mengambil data educations",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
