/*
  Warnings:

  - You are about to drop the column `isActive` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_isActive_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "isActive",
DROP COLUMN "userAgent";
