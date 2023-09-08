-- CreateTable
CREATE TABLE "api_key" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "key" CHAR(64),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "group_id" INTEGER,
    "evidence_id" INTEGER,
    "claim" VARCHAR(1000),
    "result_tag" INTEGER,
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_group" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "name" VARCHAR(100),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "claim_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "category_id" INTEGER,
    "evidence" VARCHAR(1000),
    "url" VARCHAR(200),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "evidence_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "claim_id" INTEGER,
    "topic_id" INTEGER,
    "content" VARCHAR(1000),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "feedback_topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "topic_id" INTEGER,
    "content" VARCHAR(1000),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervise" (
    "supervisor_id" INTEGER NOT NULL,
    "supervised_id" INTEGER NOT NULL,
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "supervise_pkey" PRIMARY KEY ("supervisor_id","supervised_id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "topic" VARCHAR(100),

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "birthdate" DATE,
    "phone" CHAR(10),
    "email" VARCHAR(100),
    "username" VARCHAR(100),
    "password" CHAR(64),
    "role" CHAR(1),
    "created_date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_evidence_id_fkey" FOREIGN KEY ("evidence_id") REFERENCES "evidence"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "claim_group"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "claim_group" ADD CONSTRAINT "claim_group_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "evidence_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claim"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "feedback_topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supervise" ADD CONSTRAINT "supervise_supervised_id_fkey" FOREIGN KEY ("supervised_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supervise" ADD CONSTRAINT "supervise_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

