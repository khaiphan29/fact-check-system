/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `group_id` on table `claim` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "claim" DROP CONSTRAINT "claim_group_id_fkey";

-- AlterTable
ALTER TABLE "claim" ALTER COLUMN "group_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "claim_group"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
