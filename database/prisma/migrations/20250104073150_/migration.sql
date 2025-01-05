/*
  Warnings:

  - Made the column `storageData` on table `file` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "file" ALTER COLUMN "storageData" SET NOT NULL;
