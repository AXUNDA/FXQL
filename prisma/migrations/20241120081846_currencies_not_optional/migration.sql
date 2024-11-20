/*
  Warnings:

  - Made the column `SourceCurrency` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DestinationCurrency` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "SourceCurrency" SET NOT NULL,
ALTER COLUMN "DestinationCurrency" SET NOT NULL;
