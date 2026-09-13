import { getRandomColor } from "../../app/utils/colors.js";
import { db } from "../db.js";
import { truncateTable } from "./util/truncate_tables.js";

const categories = [
  { color: getRandomColor(), name: "Website" },
  { color: getRandomColor(), name: "Mobile" },
  { color: getRandomColor(), name: "Design UI/UX" },
  { color: getRandomColor(), name: "Desain Grafis" },
];

async function seedPortofolioCategories() {
  await truncateTable("portfolio_categories");

  const now = new Date();

  for (const category of categories) {
    await db.orm.portfolio_categories.create({
      ...category,
      createdAt: now,
      updatedAt: now,
    });
  }
}

export default seedPortofolioCategories;
