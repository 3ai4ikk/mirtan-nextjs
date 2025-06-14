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
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_id_key" ON "Content"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Content_contentId_key" ON "Content"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Test_link_key" ON "Test"("link");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
