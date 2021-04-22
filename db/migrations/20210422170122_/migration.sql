/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Listing.name_unique" ON "Listing"("name");
