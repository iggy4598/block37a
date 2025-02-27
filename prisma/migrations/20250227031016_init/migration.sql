/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewText` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "description",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "content",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "reviewText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
