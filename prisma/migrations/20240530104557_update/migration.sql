-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "desc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "portfolio_categories" ADD COLUMN     "color" TEXT;
