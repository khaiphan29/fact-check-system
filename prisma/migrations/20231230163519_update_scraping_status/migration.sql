/*
  Warnings:

  - Changed the type of `status` on the `scraping_history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "scraping_history" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;
