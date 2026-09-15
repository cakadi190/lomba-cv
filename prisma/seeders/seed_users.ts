import { db } from "~~/prisma/db.js";
import { truncateTable } from "~~/prisma/seeders/util/truncate_tables.js";
import { hashPassword } from "~~/server/lib/utils/auth.js";

async function seedUsers() {
  await truncateTable("users");

  const hashedPassword = hashPassword("@DIBoo190203");

  const now = new Date();
  await db.orm.users.create({
    name: "Amir Zuhdi Wibowo",
    email: "me@cakadi.web.id",
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  });
}

export default seedUsers;
