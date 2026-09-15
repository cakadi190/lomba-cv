import { getRandomColor } from "../../app/utils/colors.js";
import { db } from "../db.js";
import { truncateTable } from "./util/truncate_tables.js";

const categories = [
  { color: getRandomColor(), name: "Teknologi" },
  { color: getRandomColor(), name: "Tips & Trik" },
  { color: getRandomColor(), name: "Pengalaman" },
];

async function seedPostCategories() {
  await truncateTable("post_categories");

  const now = new Date();

  for (const category of categories) {
    await db.orm.post_categories.create({
      ...category,
      createdAt: now,
      updatedAt: now,
    });
  }
}

export default seedPostCategories;
