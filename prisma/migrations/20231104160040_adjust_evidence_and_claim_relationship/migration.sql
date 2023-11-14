/*
  Warnings:

  - You are about to drop the column `evidence_id` on the `claim` table. All the data in the column will be lost.
  - Added the required column `claim_id` to the `evidence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "claim" DROP CONSTRAINT "claim_evidence_id_fkey";

-- AlterTable
ALTER TABLE "claim" DROP COLUMN "evidence_id";

-- AlterTable
ALTER TABLE "evidence" ADD COLUMN     "claim_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claim"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
