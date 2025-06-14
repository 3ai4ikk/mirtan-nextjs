/*
  Warnings:

  - You are about to drop the column `contentId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `bodyJSON` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subBody` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subBodyJSON` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `table` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tableJSON` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_contentId_fkey";

-- DropIndex
DROP INDEX "Content_contentId_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contentId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "body",
DROP COLUMN "bodyJSON",
DROP COLUMN "description",
DROP COLUMN "subBody",
DROP COLUMN "subBodyJSON",
DROP COLUMN "table",
DROP COLUMN "tableJSON",
DROP COLUMN "title";

-- DropTable
DROP TABLE "Test";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_id_fkey" FOREIGN KEY ("id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
