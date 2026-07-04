import prisma from "../../lib/prisma.ts";
import { getRandomColor } from "../../utils/colors.ts";
import { truncateTable } from "./util/truncate_tables.ts";

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
