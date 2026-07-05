import prisma from "~~/lib/prisma.js";
import { truncateTable } from "~~/prisma/seeders/util/truncate_tables.js";
import { hashPassword } from "~~/server/lib/utils/auth.js";

async function seedUsers() {
  await truncateTable("user");

  const hashedPassword = hashPassword("@DIBoo190203");

  await prisma.user.create({
    data: {
      name: "Amir Zuhdi Wibowo",
      email: "me@masadi.net",
      password: hashedPassword,
    },
  });
}

export default seedUsers;
