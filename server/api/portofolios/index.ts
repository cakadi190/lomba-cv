import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    let page: number = parseInt(query?.page as string) || 1;
    let perPage: number = parseInt(query?.perPage as string) || 9;
    const skip: number = (page - 1) * perPage || 0;

    const portfoliosPromise = prisma.portfolios.findMany({
      skip,
      take: perPage,
      orderBy: {
        updated_at: 'desc'
      },
    });

    const totalCountPromise = prisma.portfolios.count();

    const [portfolios, totalCount] = await Promise.all([
      portfoliosPromise,
      totalCountPromise
    ]);

    const hasNextPage = skip + perPage < totalCount;
    const hasPrevPage = page > 1;

    return { code: 200, data: portfolios, hasNextPage, hasPrevPage };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
});
