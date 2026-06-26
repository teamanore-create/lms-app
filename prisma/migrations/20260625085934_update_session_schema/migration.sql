/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - Added the required column `accessTokenExp` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceName` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceType` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExp` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenHash` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiresAt",
DROP COLUMN "token",
ADD COLUMN     "accessTokenExp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deviceName" TEXT NOT NULL,
ADD COLUMN     "deviceType" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshTokenExp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshTokenHash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAgent" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Session_isActive_idx" ON "Session"("isActive");
