-- CreateEnum
CREATE TYPE "CafePrice" AS ENUM ('CHEAP', 'MEDIUM', 'EXPENSIVE');

-- AlterTable
ALTER TABLE "coffee_places" ADD COLUMN     "price" "CafePrice" NOT NULL DEFAULT 'CHEAP';
