/*
  Warnings:

  - You are about to drop the `Awards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Awards";

-- CreateTable
CREATE TABLE "awards" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "award" TEXT NOT NULL,
    "icon" TEXT,
    "year" INTEGER NOT NULL,
    "rank" INTEGER,
    "date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);
