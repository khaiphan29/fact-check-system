-- DropForeignKey
ALTER TABLE "evidence" DROP CONSTRAINT "evidence_claim_id_fkey";

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claim"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
