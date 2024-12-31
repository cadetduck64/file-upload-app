-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_fileFolder_fkey";

-- AlterTable
ALTER TABLE "file" ALTER COLUMN "fileFolder" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_fileFolder_fkey" FOREIGN KEY ("fileFolder") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
