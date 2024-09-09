-- AlterTable
ALTER TABLE `users` ADD COLUMN `user_image` VARCHAR(191) NULL,
    ADD COLUMN `user_jabatan` INTEGER NULL,
    ADD COLUMN `user_level` INTEGER NULL;

-- CreateTable
CREATE TABLE `jabatan` (
    `jabatan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jabatan_nama` VARCHAR(191) NOT NULL,
    `jabatan_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jabatan_updated` DATETIME(3) NOT NULL,
    `jabatan_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`jabatan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sktm` (
    `sktm_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sktm_user_nama` INTEGER NOT NULL,
    `sktm_tgl_lahir` DATE NOT NULL,
    `sktm_tempat_lahir` VARCHAR(191) NOT NULL,
    `sktm_alamat` VARCHAR(191) NOT NULL,
    `sktm_nama_ortu` VARCHAR(191) NOT NULL,
    `sktm_tgl_lahir_ortu` DATE NOT NULL,
    `sktm_pekerjaan_ortu` VARCHAR(191) NOT NULL,
    `sktm_nik_ortu` VARCHAR(191) NOT NULL,
    `sktm_alamat_ortu` VARCHAR(191) NOT NULL,
    `sktm_kepentingan` VARCHAR(191) NOT NULL,
    `sktm_ttd` INTEGER NULL,

    PRIMARY KEY (`sktm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_user_jabatan_fkey` FOREIGN KEY (`user_jabatan`) REFERENCES `jabatan`(`jabatan_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sktm` ADD CONSTRAINT `sktm_sktm_ttd_fkey` FOREIGN KEY (`sktm_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
