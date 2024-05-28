import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    let page: number = parseInt(query?.page as string) || 1;
    let perPage: number = parseInt(query?.perPage as string) || 3;
    const skip: number = (page - 1) * perPage || 0;

    const educations = await prisma.educations.findMany({
      skip,
      take: perPage,
      orderBy: {
        start: 'desc'
      },
    });

    return { code: 200, data: educations };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
});
