import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (_event) => {
  try {
    const cacheKey = "coffee_shops:regions";

    return await Cache.remember(cacheKey, 3600, async () => {
      // Ambil region unik dari database yang tidak null dan tidak kosong.
      // No `distinct` on the Mongo ORM lane, so dedupe in JS after reading
      // just the region field.
      const coffeePlaces = await db.orm.coffee_places
        .select("region")
        .orderBy({ region: 1 })
        .all();

      const regions = Array.from(
        new Set(
          coffeePlaces
            .map((item) => item.region)
            .filter((region): region is string => !!region),
        ),
      ).sort();

      return {
        code: 200,
        data: regions,
      };
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan saat mengambil data region coffee shops",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
