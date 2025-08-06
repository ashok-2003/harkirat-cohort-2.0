-- CreateTable
CREATE TABLE "public"."Sum" (
    "id" SERIAL NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,

    CONSTRAINT "Sum_pkey" PRIMARY KEY ("id")
);
