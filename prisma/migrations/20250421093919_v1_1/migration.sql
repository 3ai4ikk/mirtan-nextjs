/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preview` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "preview" TEXT NOT NULL,
ADD COLUMN     "table" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_link_key" ON "Product"("link");
