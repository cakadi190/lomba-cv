import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const _portofolioModel = prisma.portfolio;

    const page: number = parseInt(query?.page as string, 10) || 1;
    const perPage: number = parseInt(query?.perPage as string, 10) || 12;
    const skip: number = (page - 1) * perPage || 0;

    const portofolioTotal = await _portofolioModel.count();
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
        updated_at: "desc",
      },
    });

    const totalCountPromise = await _portofolioModel.count();

    const [portfolios, totalCount] = await Promise.all([
      portfoliosPromise,
      totalCountPromise,
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
      perPage,
      totalData: portofolioTotal,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
