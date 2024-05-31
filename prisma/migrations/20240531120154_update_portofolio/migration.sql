/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `portfolios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "portfolios" DROP COLUMN "isPrivate",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
