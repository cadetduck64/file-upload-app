/*
  Warnings:

  - Added the required column `uploadDate` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaderId` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "file" ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploaderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
