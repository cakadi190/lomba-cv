import "dotenv/config";
import prisma from "../lib/prisma.ts";

import seedAwards from "./seeders/seed_awards.ts";
import seedCareers from "./seeders/seed_careers.ts";
import seedCoffeePlaces from "./seeders/seed_coffeeplaces.ts";
import seedEducations from "./seeders/seed_educations.ts";
import seedOrganizations from "./seeders/seed_organizations.ts";
import seedPortofolio from "./seeders/seed_portofolio.ts";
import seedPortofolioCategories from "./seeders/seed_portofolio_categories.ts";
import seedPortofolioCategoryLinks from "./seeders/seed_portofolio_category.ts";
import seedUsers from "./seeders/seed_users.ts";
import { truncateTable } from "./seeders/util/truncate_tables.ts";

async function main() {
  try {
    await truncateTable("award");
    await truncateTable("portfolio");
    await truncateTable("portfolioCategory");
    await truncateTable("portfolioCategoryLink");
    await truncateTable("career");
    await truncateTable("education");
    await truncateTable("organization");
    await truncateTable("coffeePlace");
    await truncateTable("user");

    await seedUsers();
    console.log("\x1b[32m\u2714  Users seeded successfully");

    await seedAwards();
    console.log("\x1b[32m\u2714  Awards seeded successfully");

    await seedPortofolioCategories();
    console.log("\x1b[32m\u2714  Portofolio Categories seeded successfully");

    await seedPortofolio();
    console.log("\x1b[32m\u2714  Portofolio seeded successfully");

    await seedPortofolioCategoryLinks();
    console.log(
      "\x1b[32m\u2714  Portofolio Category Links seeded successfully",
    );

    await seedOrganizations();
    console.log("\x1b[32m\u2714  Organizations seeded successfully");

    await seedCareers();
    console.log("\x1b[32m\u2714  Careers seeded successfully");

    await seedEducations();
    console.log("\x1b[32m\u2714  Educations seeded successfully");

    await seedCoffeePlaces();
    console.log("\x1b[32m\u2714  Coffee Places seeded successfully");
  } catch (error) {
    await prisma.$disconnect();
    console.error("\x1b[31m\u2718  Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// Run the code
main();
