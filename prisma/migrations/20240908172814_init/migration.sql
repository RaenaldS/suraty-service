/*
  Warnings:

  - You are about to drop the column `sktm_alamat_ortu` on the `sktm` table. All the data in the column will be lost.
  - You are about to drop the column `sktm_nama_ortu` on the `sktm` table. All the data in the column will be lost.
  - You are about to drop the column `sktm_nik_ortu` on the `sktm` table. All the data in the column will be lost.
  - You are about to drop the column `sktm_pekerjaan_ortu` on the `sktm` table. All the data in the column will be lost.
  - You are about to drop the column `sktm_tgl_lahir_ortu` on the `sktm` table. All the data in the column will be lost.
  - You are about to drop the column `sktm_user_nama` on the `sktm` table. All the data in the column will be lost.
  - Added the required column `sktm_agama` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_dusun` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_jk` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_nama` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_noKtp` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_pekerjaan` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_suku` to the `sktm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktm_updated` to the `sktm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sktm` DROP COLUMN `sktm_alamat_ortu`,
    DROP COLUMN `sktm_nama_ortu`,
    DROP COLUMN `sktm_nik_ortu`,
    DROP COLUMN `sktm_pekerjaan_ortu`,
    DROP COLUMN `sktm_tgl_lahir_ortu`,
    DROP COLUMN `sktm_user_nama`,
    ADD COLUMN `sktm_agama` INTEGER NOT NULL,
    ADD COLUMN `sktm_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `sktm_createdBy` INTEGER NULL,
    ADD COLUMN `sktm_deleted` DATETIME(3) NULL,
    ADD COLUMN `sktm_dusun` VARCHAR(191) NOT NULL,
    ADD COLUMN `sktm_jk` ENUM('L', 'P') NOT NULL,
    ADD COLUMN `sktm_nama` VARCHAR(191) NOT NULL,
    ADD COLUMN `sktm_noKtp` VARCHAR(191) NOT NULL,
    ADD COLUMN `sktm_noSurat` VARCHAR(191) NULL,
    ADD COLUMN `sktm_pekerjaan` VARCHAR(191) NOT NULL,
    ADD COLUMN `sktm_suku` VARCHAR(191) NOT NULL,
    ADD COLUMN `sktm_updated` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `sktm` ADD CONSTRAINT `sktm_sktm_createdBy_fkey` FOREIGN KEY (`sktm_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
