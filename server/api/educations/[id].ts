import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    const educations = await prisma.educations.findMany({
      where: { id },
    });

    if (!educations || educations.length === 0) {
      return { code: 404, message: 'Educations not found' };
    }

    return { code: 200, data: educations };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
})
