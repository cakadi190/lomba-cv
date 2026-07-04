import prisma from "../../lib/prisma.ts";
import { hashPassword } from "../../server/utils/auth.ts";
import { truncateTable } from "./util/truncate_tables.ts";

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
