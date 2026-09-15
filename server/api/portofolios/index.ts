import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Math.max(1, parseInt(query?.page as string, 10) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(query?.perPage as string, 10) || 12),
    );
    const skip = (page - 1) * perPage || 0;

    const cacheKey = `portfolios:list:page:${page}:perPage:${perPage}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      const portfolios = await db.orm.portfolios
        .orderBy({ updatedAt: -1 })
        .offset(skip)
        .limit(perPage)
        .all();

      const totalCount = (await db.orm.portfolios.all()).length;

      // The old PortfolioCategoryLink join table is gone — categories are
      // now referenced by `categoryIds: ObjectId[]` on the Portfolio
      // document. Resolve categories per portfolio with an application-level
      // lookup instead of a SQL join. The Mongo ORM `.where(...)` only
      // supports object equality today (no `.in()` — see prisma-8 skill,
      // queries-mongo.md), so all categories are fetched and matched in JS
      // rather than filtered server-side.
      const allCategoryIds = new Set(
        portfolios.flatMap((p) => (p.categoryIds ?? []).map((id) => String(id))),
      );
      const categories =
        allCategoryIds.size > 0
          ? (await db.orm.portfolio_categories.all()).filter((category) =>
            allCategoryIds.has(String(category._id)),
          )
          : [];
      const categoriesById = new Map(
        categories.map((category) => [String(category._id), category]),
      );

      const data = portfolios.map((portfolio) => ({
        ...portfolio,
        categories: (portfolio.categoryIds ?? [])
          .map((id) => categoriesById.get(String(id)))
          .filter((category) => category !== undefined),
      }));

      console.log(data.length)

      const hasNextPage = skip + perPage < totalCount;
      const hasPrevPage = page > 1;

      return {
        code: 200,
        data,
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
