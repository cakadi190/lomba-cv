-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "demoLink" TEXT,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sourceCode" TEXT;
