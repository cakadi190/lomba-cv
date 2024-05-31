import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import seedAwards from './seeders/seed_awards.ts';
import seedOrganizations from './seeders/seed_organizations.ts';
import seedCareers from './seeders/seed_careers.ts';
import seedEducations from './seeders/seed_educations.ts';
import seedPortofolio from './seeders/seed_portofolio.ts';
import seedPortofolioCategories from './seeders/seed_portofolio_categories.ts';
import seedPortofolioCategoryLinks from './seeders/seed_portofolio_category.ts';
import { truncateTable } from './seeders/util/truncate_tables.ts';

async function main() {
  try {
    await truncateTable('awards');
    await truncateTable('portfolios');
    await truncateTable('portfolio_categories');
    await truncateTable('careers');
    await truncateTable('educations');
    await truncateTable('organizations');

    await seedAwards();
    console.log('\x1b[32m\u2714  Awards seeded successfully');

    await seedPortofolioCategories();
    console.log('\x1b[32m\u2714  Portofolio Categories seeded successfully');
    
    await seedPortofolio();
    console.log('\x1b[32m\u2714  Portofolio seeded successfully');

    await seedPortofolioCategoryLinks();
    console.log('\x1b[32m\u2714  Portofolio Category Links seeded successfully');
    
    await seedOrganizations();
    console.log('\x1b[32m\u2714  Organizations seeded successfully');
    
    await seedCareers();
    console.log('\x1b[32m\u2714  Careers seeded successfully');

    await seedEducations();
    console.log('\x1b[32m\u2714  Educations seeded successfully');
  } catch (error) {
    await prisma.$disconnect()
    console.error('\x1b[31m\u2718  Error seeding data:', error);
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    process.exit(0);
  }
}

main();
