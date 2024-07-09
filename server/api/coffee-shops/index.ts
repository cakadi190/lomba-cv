import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi helper untuk mengonversi BigInt
const convertBigInt = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'bigint' ? value.toString() : convertBigInt(value)
    ])
  );
};

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const _coffeeShopsModel = prisma.coffee_places;

    const page = Number(query?.page) || 1;
    const perPage = Number(query?.perPage) || 12;
    const skip = (page - 1) * perPage;

    const [coffeeShops, totalCount] = await Promise.all([
      _coffeeShopsModel.findMany({
        skip,
        take: perPage,
      }),
      _coffeeShopsModel.count()
    ]);

    // Konversi BigInt ke string
    const serializedCoffeeShops = convertBigInt(coffeeShops);

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return { 
      code: 200, 
      data: serializedCoffeeShops, 
      hasNextPage, 
      hasPrevPage, 
      totalPage: totalPages,
      page,
      perPage,
      totalData: totalCount
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: 'Internal Server Error' };
  } finally {
    await prisma.$disconnect();
  }
});