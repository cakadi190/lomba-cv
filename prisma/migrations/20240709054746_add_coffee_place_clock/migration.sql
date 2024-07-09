/*
  Warnings:

  - You are about to drop the column `close_time` on the `coffee_places` table. All the data in the column will be lost.
  - You are about to drop the column `open_time` on the `coffee_places` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coffee_places" DROP COLUMN "close_time",
DROP COLUMN "open_time",
ADD COLUMN     "close" TEXT,
ADD COLUMN     "open" TEXT;
