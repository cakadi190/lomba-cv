import { PrismaClient } from '@prisma/client';
import { truncateTable } from './util/truncate_tables.ts';
import { getRandomColor } from '../../utils/colors.ts';
const prisma = new PrismaClient();

const categories = [
  { color: getRandomColor(), name: 'Website' },
  { color: getRandomColor(), name: 'Mobile' },
  { color: getRandomColor(), name: 'Design UI/UX' },
  { color: getRandomColor(), name: 'Desain Grafis' }
];

async function seedPortofolioCategories() {
  truncateTable('portfolio_categories');

  for (const category of categories) {
    await prisma.portfolio_categories.create({
      data: category,
    });
  }
}

export default seedPortofolioCategories;
