/*
  Warnings:

  - A unique constraint covering the columns `[name,category]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Listing.name_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Listing_name_category_key" ON "Listing"("name", "category");
