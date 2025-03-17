/*
  Warnings:

  - You are about to drop the column `valor` on the `products` table. All the data in the column will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "valor",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s',
ADD COLUMN     "price" INTEGER NOT NULL;
