/*
  Warnings:

  - Added the required column `hilang_barang` to the `kehilangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hilang_dari` to the `kehilangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hilang_hari` to the `kehilangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hilang_ke` to the `kehilangan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kehilangan` ADD COLUMN `hilang_barang` VARCHAR(191) NOT NULL,
    ADD COLUMN `hilang_dari` VARCHAR(191) NOT NULL,
    ADD COLUMN `hilang_hari` VARCHAR(191) NOT NULL,
    ADD COLUMN `hilang_ke` VARCHAR(191) NOT NULL;
