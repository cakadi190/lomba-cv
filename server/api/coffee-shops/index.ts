import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Math.max(1, Number(query?.page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(query?.perPage) || 12));
    const skip = (page - 1) * perPage;

    const city = query?.city ? String(query.city) : undefined;
    const search = query?.search ? String(query.search) : undefined;

    // NOTE: the Mongo ORM `.where(...)` only supports object equality today
    // (see prisma-8 skill, queries-mongo.md). Case-insensitive / substring
    // filters (`contains`/`mode: "insensitive"`) aren't available through
    // that surface yet, so city/search filtering is applied in JS below
    // after fetching the page's candidate rows. This is a judgment call
    // since a proper text-index / regex filter would need the MongoFilterExpr
    // façade-gap helpers.

    const cacheKey = `coffee_shops:list:page:${page}:perPage:${perPage}:city:${city || "all"}:search:${search || "all"}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      let all = await db.orm.coffee_places
        .orderBy({ recomended: -1, updatedAt: 1 })
        .all();

      if (city) {
        const cityLower = city.toLowerCase();
        all = all.filter((c) => c.region?.toLowerCase() === cityLower);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        all = all.filter((c) => c.name.toLowerCase().includes(searchLower));
      }

      const totalCount = all.length;
      const coffeeShops = all.slice(skip, skip + perPage);

      const totalPages = Math.ceil(totalCount / perPage);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        code: 200,
        data: coffeeShops,
        hasNextPage,
        hasPrevPage,
        totalPage: totalPages,
        page,
        perPage,
        totalData: totalCount,
      };
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan saat mengambil data coffee shops",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
