-- CreateTable
CREATE TABLE "Entry" (
    "EntryId" TEXT NOT NULL,
    "SourceCurrency" TEXT,
    "DestinationCurrency" TEXT,
    "SellPrice" DOUBLE PRECISION NOT NULL,
    "BuyPrice" DOUBLE PRECISION NOT NULL,
    "CapAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("EntryId")
);
