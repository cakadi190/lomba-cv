import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (_event) => {
  try {
    const _coffeeShopsModel = prisma.coffeePlace;

    // Ambil region unik dari database yang tidak null dan tidak kosong
    const coffeePlaces = await _coffeeShopsModel.findMany({
      where: {
        AND: [{ region: { not: null } }, { region: { not: "" } }],
      },
      select: {
        region: true,
      },
      distinct: ["region"],
      orderBy: {
        region: "asc",
      },
    });

    const regions = coffeePlaces
      .map((item) => item.region)
      .filter((region): region is string => !!region);

    return {
      code: 200,
      data: regions,
    };
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
