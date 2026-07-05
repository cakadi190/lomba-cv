import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page: number = parseInt(query?.page as string, 10) || 1;
    const perPage: number = parseInt(query?.perPage as string, 10) || 3;
    const skip: number = (page - 1) * perPage || 0;

    const educations = await prisma.education.findMany({
      skip,
      take: perPage,
      orderBy: {
        start: "desc",
      },
    });

    return { code: 200, data: educations };
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
