import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type TableName = keyof PrismaClient;

export const truncateTable = async (tableName: TableName): Promise<void> => {
  const models = Object.keys(prisma) as TableName[];
  
  if (!models.includes(tableName)) {
    throw new Error(`Table ${tableName as string} does not exist or cannot be truncated.`);
  }

  await (prisma[tableName] as any).deleteMany({});
};
