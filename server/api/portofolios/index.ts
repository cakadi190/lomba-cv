import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const _portofolioModel = prisma.portfolio;

    const page = Math.max(1, parseInt(query?.page as string, 10) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(query?.perPage as string, 10) || 12),
    );
    const skip = (page - 1) * perPage || 0;

    const cacheKey = `portfolios:list:page:${page}:perPage:${perPage}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      const portfoliosPromise = _portofolioModel.findMany({
        skip,
        take: perPage,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          updated_at: "desc",
        },
      });

      const totalCountPromise = _portofolioModel.count();

      const [portfolios, totalCount] = await Promise.all([
        portfoliosPromise,
        totalCountPromise,
      ]);

      const hasNextPage = skip + perPage < totalCount;
      const hasPrevPage = page > 1;

      return {
        code: 200,
        data: portfolios,
        hasNextPage,
        hasPrevPage,
        totalPage: Math.ceil(totalCount / perPage),
        page,
        perPage,
        totalData: totalCount,
      };
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan saat mengambil data portofolios",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
