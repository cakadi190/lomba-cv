import { PrismaClient } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
const prisma = new PrismaClient();

const portoData = async () => {
  const portfolios = await prisma.portfolios.findMany({
    select: { id: true }
  });
  return portfolios.map(portfolio => portfolio.id);
};

const portoCategoryData = async () => {
  const categories = await prisma.portfolio_categories.findMany({
    select: { id: true }
  });
  return categories.map(category => category.id);
};

async function seedPortofolioCategoryLinks() {
  const ids = await portoData();
  const categories = await portoCategoryData();

  const portfolioCategoryLinks = [
    { portfolioId: ids[0], categoryId: categories[0] },
    { portfolioId: ids[1], categoryId: categories[0] },
    { portfolioId: ids[3], categoryId: categories[0] },
    { portfolioId: ids[4], categoryId: categories[0] },
    { portfolioId: ids[5], categoryId: categories[1] },
    { portfolioId: ids[6], categoryId: categories[0] },
    { portfolioId: ids[7], categoryId: categories[0] },
    { portfolioId: ids[8], categoryId: categories[0] },
    { portfolioId: ids[9], categoryId: categories[0] },
    { portfolioId: ids[10], categoryId: categories[0] },
    { portfolioId: ids[11], categoryId: categories[0] },
    { portfolioId: ids[12], categoryId: categories[0] },
    { portfolioId: ids[13], categoryId: categories[0] },
    { portfolioId: ids[14], categoryId: categories[0] },
    { portfolioId: ids[15], categoryId: categories[0] },
    { portfolioId: ids[16], categoryId: categories[0] },
    { portfolioId: ids[17], categoryId: categories[0] },
    { portfolioId: ids[18], categoryId: categories[0] },
    { portfolioId: ids[19], categoryId: categories[0] },
    { portfolioId: ids[20], categoryId: categories[0] },
    { portfolioId: ids[21], categoryId: categories[0] },
  ];

  // Optionally truncate the table before seeding
  await truncateTable('portfolioCategory');

  for (const link of portfolioCategoryLinks) {
    await prisma.portfolioCategory.create({
      data: link,
    });
  }
}

seedPortofolioCategoryLinks().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});

export default seedPortofolioCategoryLinks;
