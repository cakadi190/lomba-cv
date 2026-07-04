import prisma from "../../lib/prisma.js";
import { getRandomColor } from "../../app/utils/colors.js";
import { truncateTable } from "./util/truncate_tables.js";

const categories = [
  { color: getRandomColor(), name: "Website" },
  { color: getRandomColor(), name: "Mobile" },
  { color: getRandomColor(), name: "Design UI/UX" },
  { color: getRandomColor(), name: "Desain Grafis" },
];

async function seedPortofolioCategories() {
  await truncateTable("portfolioCategory");

  for (const category of categories) {
    await prisma.portfolioCategory.create({
      data: category,
    });
  }
}

export default seedPortofolioCategories;
