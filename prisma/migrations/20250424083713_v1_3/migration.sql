/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `bodyJSON` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subBody` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subBodyJSON` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "bodyJSON" JSONB NOT NULL,
ADD COLUMN     "subBody" TEXT NOT NULL,
ADD COLUMN     "subBodyJSON" JSONB NOT NULL;
