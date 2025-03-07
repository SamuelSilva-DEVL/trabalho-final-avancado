-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('SNEAKERS', 'TENIS_PARA_CORRIDA', 'TENIS_PARA_ACADEMIA', 'CASUAL');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(200) NOT NULL,
    "category" "CategoryEnum" NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "valor" INTEGER NOT NULL,
    "quantity_stock" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
