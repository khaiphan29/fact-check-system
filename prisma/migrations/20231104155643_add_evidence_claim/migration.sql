/*
  Warnings:

  - You are about to drop the column `result_tag` on the `claim` table. All the data in the column will be lost.
  - Added the required column `label_tag` to the `claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evidence_claim` to the `evidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claim" DROP COLUMN "result_tag",
ADD COLUMN     "label_tag" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "evidence" ADD COLUMN     "evidence_claim" VARCHAR(1000) NOT NULL;
