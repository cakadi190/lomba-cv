import { db } from "../db.js";

const portoData = async () => {
  const portfolios = await db.orm.portfolios.select("_id").all();
  return portfolios.map((portfolio) => portfolio._id);
};

const portoCategoryData = async () => {
  const categories = await db.orm.portfolio_categories.select("_id").all();
  return categories.map((category) => category._id);
};

// The old PortfolioCategoryLink join table is gone in the Mongo contract —
// categories are now referenced by a `categoryIds: ObjectId[]` array
// directly on the Portfolio document. This seeder pushes the relevant
// category id into each target portfolio's `categoryIds` array instead of
// creating separate join rows.
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

  for (const link of portfolioCategoryLinks) {
    if (!link.portfolioId || !link.categoryId) continue;
    await db.orm.portfolios
      .where({ _id: link.portfolioId })
      .update((p) => [p.categoryIds.push(link.categoryId)]);
  }
}

export default seedPortofolioCategoryLinks;
