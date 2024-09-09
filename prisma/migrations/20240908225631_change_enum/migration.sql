/*
  Warnings:

  - Made the column `sktm_jk` on table `sktm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sktm` MODIFY `sktm_jk` INTEGER NOT NULL;
