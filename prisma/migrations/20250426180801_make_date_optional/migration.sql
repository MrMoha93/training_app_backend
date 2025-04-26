/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_sessionId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "sessionId",
ADD COLUMN     "date" TIMESTAMP(3);

-- DropTable
DROP TABLE "Session";
