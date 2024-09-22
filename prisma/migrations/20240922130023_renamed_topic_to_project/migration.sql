/*
  Warnings:

  - You are about to drop the column `topicId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "topicId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
