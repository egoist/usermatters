/*
  Warnings:

  - A unique constraint covering the columns `[googleUserId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "googleUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users.googleUserId_unique" ON "users"("googleUserId");
