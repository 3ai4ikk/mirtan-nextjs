-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "images" TEXT[],
    "category" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subBody" TEXT NOT NULL,
    "subBodyJSON" JSONB NOT NULL,
    "body" TEXT,
    "bodyJSON" JSONB,
    "table" TEXT,
    "tableJSON" JSONB,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_link_key" ON "Product"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Content_id_key" ON "Content"("id");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
