/*
  Warnings:

  - You are about to drop the column `fileURL` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "fileURL",
ADD COLUMN     "storageData" JSONB;
