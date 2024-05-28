import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug');
    const portfolios = await prisma.portfolios.findMany({
      where: { slug },
    });

    if (!portfolios || portfolios.length === 0) {
      return { code: 404, message: 'Educations not found' };
    }

    return { code: 200, data: portfolios };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
})
