import "dotenv/config";
import prisma from "../lib/prisma.js";

import seedAwards from "./seeders/seed_awards.js";
import seedCareers from "./seeders/seed_careers.js";
import seedCoffeePlaces from "./seeders/seed_coffeeplaces.js";
import seedEducations from "./seeders/seed_educations.js";
import seedOrganizations from "./seeders/seed_organizations.js";
import seedPortofolio from "./seeders/seed_portofolio.js";
import seedPortofolioCategories from "./seeders/seed_portofolio_categories.js";
import seedPortofolioCategoryLinks from "./seeders/seed_portofolio_category.js";
import seedUsers from "./seeders/seed_users.js";
import { truncateTable } from "./seeders/util/truncate_tables.js";

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
