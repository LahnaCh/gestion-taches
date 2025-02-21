/*
  Warnings:

  - You are about to alter the column `deadline` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Made the column `author` on table `Todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "deadline" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("author", "createdAt", "deadline", "description", "id", "priority", "status", "title", "updatedAt", "userId") SELECT "author", "createdAt", "deadline", "description", "id", "priority", "status", "title", "updatedAt", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
