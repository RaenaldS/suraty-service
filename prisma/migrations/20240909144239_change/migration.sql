-- CreateTable
CREATE TABLE `kehilangan` (
    `hilang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hilang_nomor` VARCHAR(191) NULL,
    `hilang_nama` VARCHAR(191) NOT NULL,
    `hilang_jk` INTEGER NOT NULL,
    `hilang_umur` INTEGER NOT NULL,
    `hilang_pekerjaan` VARCHAR(191) NOT NULL,
    `hilang_alamat` VARCHAR(191) NOT NULL,
    `hilang_ttd` INTEGER NULL,
    `hilang_createdBy` INTEGER NULL,
    `hilang_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hilang_updated` DATETIME(3) NOT NULL,
    `hilang_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`hilang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penghasilan` (
    `hasil_id` INTEGER NOT NULL AUTO_INCREMENT,
    `hasil_nomor` VARCHAR(191) NULL,
    `hasil_nama` VARCHAR(191) NOT NULL,
    `hasil_umur` INTEGER NOT NULL,
    `hasil_pekerjaan` VARCHAR(191) NOT NULL,
    `hasil_alamat` VARCHAR(191) NOT NULL,
    `hasil_penghasilan` VARCHAR(191) NOT NULL,
    `hasil_ttd` INTEGER NULL,
    `hasil_createdBy` INTEGER NULL,
    `hasil_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hasil_updated` DATETIME(3) NOT NULL,
    `hasil_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`hasil_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tani` (
    `tani_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tani_nomor` VARCHAR(191) NULL,
    `tani_nama` VARCHAR(191) NOT NULL,
    `tani_jabatan` VARCHAR(191) NOT NULL,
    `tani_sekretariat` VARCHAR(191) NOT NULL,
    `tani_alamat` VARCHAR(191) NOT NULL,
    `tani_keperluan` VARCHAR(191) NOT NULL,
    `tani_tujuanBantuan` VARCHAR(191) NOT NULL,
    `tani_ttd` INTEGER NULL,
    `tani_createdBy` INTEGER NULL,
    `tani_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tani_updated` DATETIME(3) NOT NULL,
    `tani_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`tani_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kehilangan` ADD CONSTRAINT `kehilangan_hilang_ttd_fkey` FOREIGN KEY (`hilang_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kehilangan` ADD CONSTRAINT `kehilangan_hilang_createdBy_fkey` FOREIGN KEY (`hilang_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penghasilan` ADD CONSTRAINT `penghasilan_hasil_ttd_fkey` FOREIGN KEY (`hasil_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penghasilan` ADD CONSTRAINT `penghasilan_hasil_createdBy_fkey` FOREIGN KEY (`hasil_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tani` ADD CONSTRAINT `tani_tani_ttd_fkey` FOREIGN KEY (`tani_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tani` ADD CONSTRAINT `tani_tani_createdBy_fkey` FOREIGN KEY (`tani_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
