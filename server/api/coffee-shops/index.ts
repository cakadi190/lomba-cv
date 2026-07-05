import type { Prisma } from "@prisma/client";
import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { Cache } from "~~/server/lib/facades/cache";

// biome-ignore lint/suspicious/noExplicitAny: helper to convert BigInt in dynamic objects
const convertBigInt = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertBigInt(item));
  }
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "bigint" ? value.toString() : convertBigInt(value),
    ]),
  );
};

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const _coffeeShopsModel = prisma.coffeePlace;

    const page = Math.max(1, Number(query?.page) || 1);
    const perPage = Math.min(100, Math.max(1, Number(query?.perPage) || 12));
    const skip = (page - 1) * perPage;

    const city = query?.city ? String(query.city) : undefined;
    const search = query?.search ? String(query.search) : undefined;

    const where: Prisma.CoffeePlaceWhereInput = {};

    if (city) {
      where.region = {
        equals: city,
        mode: "insensitive",
      };
    }

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const cacheKey = `coffee_shops:list:page:${page}:perPage:${perPage}:city:${city || "all"}:search:${search || "all"}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      const [coffeeShops, totalCount] = await Promise.all([
        _coffeeShopsModel.findMany({
          where,
          skip,
          take: perPage,
          orderBy: [{ recomended: "desc" }, { updated_at: "asc" }],
        }),
        _coffeeShopsModel.count({
          where,
        }),
      ]);

      // Konversi BigInt ke string
      const serializedCoffeeShops = convertBigInt(coffeeShops);

      const totalPages = Math.ceil(totalCount / perPage);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        code: 200,
        data: serializedCoffeeShops,
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
