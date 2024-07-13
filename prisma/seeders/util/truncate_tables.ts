import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type TableName = keyof PrismaClient;
const databaseType = process.env.DATABASE_TYPE;

/**
 * Disables foreign key constraints based on the database type.
 * 
 * @since 1.0.1
 * @async
 * @function
 */
const disableForeignKeys = async () => {
  if (databaseType === 'postgresql') {
    await prisma.$executeRawUnsafe('SET CONSTRAINTS ALL DEFERRED;');
  } else if (databaseType === 'mysql') {
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
  } else if (databaseType === 'sqlite') {
    await prisma.$executeRawUnsafe('PRAGMA foreign_keys = OFF;');
  }
};

/**
 * Enables foreign key constraints based on the database type.
 * 
 * @since 1.0.1
 * @async
 * @function
 */
const enableForeignKeys = async () => {
  if (databaseType === 'postgresql') {
    await prisma.$executeRawUnsafe('SET CONSTRAINTS ALL IMMEDIATE;');
  } else if (databaseType === 'mysql') {
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
  } else if (databaseType === 'sqlite') {
    await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;');
  }
};

/**
 * Truncates the specified table and removes all its data.
 * 
 * @since 1.0.1
 * @async
 * @function
 * @param {TableName} tableName - The name of the table to truncate.
 * @throws Will throw an error if the table does not exist or cannot be truncated.
 */
export const truncateTable = async (tableName: TableName): Promise<void> => {
  const models = Object.keys(prisma) as TableName[];

  if (!models.includes(tableName)) {
    throw new Error(`Table ${tableName as string} does not exist or cannot be truncated.`);
  }

  await disableForeignKeys();
  await (prisma[tableName] as any).deleteMany({});
  await enableForeignKeys();
};
