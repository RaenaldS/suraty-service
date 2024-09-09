/*
  Warnings:

  - You are about to alter the column `sktm_jk` on the `sktm` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `sktm` MODIFY `sktm_jk` INTEGER NULL;
