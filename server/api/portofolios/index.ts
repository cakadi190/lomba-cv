import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const _portofolioModel = prisma.portfolios;

    let page: number = parseInt(query?.page as string) || 1;
    let perPage: number = parseInt(query?.perPage as string) || 12;
    const skip: number = (page - 1) * perPage || 0;

    const portfoliosPromise = await _portofolioModel.findMany({
      skip,
      take: perPage,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc'
      },
    });

    const totalCountPromise = await _portofolioModel.count();

    const [portfolios, totalCount] = await Promise.all([
      portfoliosPromise,
      totalCountPromise
    ]);

    const hasNextPage = skip + perPage < totalCount;
    const hasPrevPage = page > 1;

    return { 
      code: 200, 
      data: portfolios, 
      hasNextPage, 
      hasPrevPage, 
      totalPage: Math.ceil(totalCount / perPage),
      page,
      perPage
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
});
