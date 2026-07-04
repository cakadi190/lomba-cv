import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const educations = await prisma.educations.findMany({
      where: { id },
    });

    if (!educations || educations.length === 0) {
      return { code: 404, message: "Educations not found" };
    }

    return { code: 200, data: educations };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
