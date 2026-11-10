-- Apply in Neon SQL Editor after reviewing and backing up. No existing tables are modified.
CREATE TABLE IF NOT EXISTS "JewelleryDesign" ("id" TEXT PRIMARY KEY, "imageUrl" TEXT NOT NULL, "title" TEXT NOT NULL DEFAULT '', "sortOrder" INTEGER NOT NULL DEFAULT 0, "visible" BOOLEAN NOT NULL DEFAULT TRUE, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
