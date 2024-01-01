-- CreateTable
CREATE TABLE "evidence" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER,
    "claim_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "content" VARCHAR(3000) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "evidence_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scraping_url" VARCHAR(1000) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "evidence_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scraping_history" (
    "id" SERIAL NOT NULL,
    "source_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "scraping_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "claim" VARCHAR(1000) NOT NULL,
    "label_tag" INTEGER NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_group" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(100) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    "modified_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "claim_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "claim_id" INTEGER NOT NULL,
    "topic_id" INTEGER,
    "isNegative" BOOLEAN NOT NULL DEFAULT false,
    "isIncorrectRating" BOOLEAN NOT NULL DEFAULT false,
    "isIncorrectEvidence" BOOLEAN NOT NULL DEFAULT false,
    "content" VARCHAR(2000) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "feedback_topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthdate" DATE,
    "phone" CHAR(10),
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" CHAR(64) NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "evidence_claim_id_key" ON "evidence"("claim_id");

-- CreateIndex
CREATE UNIQUE INDEX "evidence_source_name_key" ON "evidence_source"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "evidence_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "evidence_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scraping_history" ADD CONSTRAINT "scraping_history_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "evidence_source"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "claim_group"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_group" ADD CONSTRAINT "claim_group_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claim"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "feedback_topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
