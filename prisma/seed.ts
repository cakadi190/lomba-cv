import "dotenv/config";
import { Cache } from "../server/lib/facades/cache.js";
import { db } from "./db.js";
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

/**
 * ioredis starts connecting as soon as the client is constructed but
 * `enableOfflineQueue: false` (see cache.ts) rejects any command issued
 * before that handshake finishes. Warm the connection up front so it has
 * the whole seeding run to become ready before we flush at the end.
 */
async function warmCacheConnection(): Promise<void> {
  try {
    const client = Cache.client();
    if (client.status === "ready") return;
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Redis connection timed out")), 5000);
      client.once("ready", () => {
        clearTimeout(timeout);
        resolve();
      });
      client.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  } catch {
    // Best-effort warm-up; Cache.flush() below will retry and log if it still fails.
  }
}

async function main() {
  const cacheReady = warmCacheConnection();

  try {
    await truncateTable("awards");
    await truncateTable("portfolios");
    await truncateTable("portfolio_categories");
    await truncateTable("careers");
    await truncateTable("educations");
    await truncateTable("organizations");
    await truncateTable("coffee_places");
    await truncateTable("users");

    await seedUsers();
    console.log("\x1b[32m✔  Users seeded successfully");

    await seedAwards();
    console.log("\x1b[32m✔  Awards seeded successfully");

    await seedPortofolioCategories();
    console.log("\x1b[32m✔  Portofolio Categories seeded successfully");

    await seedPortofolio();
    console.log("\x1b[32m✔  Portofolio seeded successfully");

    // NOTE: PortfolioCategoryLink is gone — categories are now referenced by
    // `categoryIds: ObjectId[]` directly on the Portfolio document. This
    // seeder now updates each Portfolio's categoryIds instead of creating
    // join rows.
    await seedPortofolioCategoryLinks();
    console.log(
      "\x1b[32m✔  Portofolio Category Links seeded successfully",
    );

    await seedOrganizations();
    console.log("\x1b[32m✔  Organizations seeded successfully");

    await seedCareers();
    console.log("\x1b[32m✔  Careers seeded successfully");

    await seedEducations();
    console.log("\x1b[32m✔  Educations seeded successfully");

    await seedCoffeePlaces();
    console.log("\x1b[32m✔  Coffee Places seeded successfully");

    try {
      await cacheReady;
      await Cache.flush();
      console.log("\x1b[32m✔  Cache flushed successfully");
    } catch (error) {
      // Cache is best-effort: a Redis outage must not fail the seed run.
      console.error("\x1b[33m⚠  Failed to flush cache:", error);
    }
  } catch (error) {
    console.error("\x1b[31m✘  Error seeding data:", error);
    await db.close();
    process.exit(1);
  } finally {
    await db.close();
    process.exit(0);
  }
}

// Run the code
main();
