-- CreateTable
CREATE TABLE "folder" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "uploaderId" INTEGER NOT NULL,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
