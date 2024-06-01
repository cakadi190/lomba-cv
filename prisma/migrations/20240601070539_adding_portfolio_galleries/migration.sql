-- CreateTable
CREATE TABLE "portfolio_galleries" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT,
    "portfolioId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_galleries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolio_galleries" ADD CONSTRAINT "portfolio_galleries_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
