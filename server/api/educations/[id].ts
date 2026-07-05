import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const educations = await prisma.education.findMany({
      where: { id },
    });

    if (!educations || educations.length === 0) {
      return { code: 404, message: "Educations not found" };
    }

    return { code: 200, data: educations };
  } catch (error) {
    logger.error(
      { err: error, id },
      "Terjadi kesalahan saat mengambil data education berdasarkan ID",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
