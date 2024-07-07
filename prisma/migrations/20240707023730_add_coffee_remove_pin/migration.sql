/*
  Warnings:

  - You are about to drop the column `map_pin` on the `coffee_places` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WifiSpeed" AS ENUM ('WEAK', 'MEDIUM', 'STRONG');

-- AlterTable
ALTER TABLE "coffee_places" DROP COLUMN "map_pin",
ADD COLUMN     "wifi_provider" TEXT,
ADD COLUMN     "wifi_speed" "WifiSpeed" NOT NULL DEFAULT 'STRONG';
