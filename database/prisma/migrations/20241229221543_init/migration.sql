/*
  Warnings:

  - You are about to drop the column `folderId` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "folderId",
ADD COLUMN     "metadata" JSONB;
