import prisma from "../../lib/prisma.js";
import { hashPassword } from "../../server/utils/auth.js";
import { truncateTable } from "./util/truncate_tables.js";

async function seedUsers() {
  await truncateTable("user");

  const hashedPassword = hashPassword("admin123");

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@example.com",
      password: hashedPassword,
    },
  });
}

export default seedUsers;
