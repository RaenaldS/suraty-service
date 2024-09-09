-- CreateTable
CREATE TABLE `belumNikah` (
    `nikah_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nikah_nomor` VARCHAR(191) NULL,
    `nikah_nama` VARCHAR(191) NOT NULL,
    `nikah_jk` INTEGER NOT NULL,
    `nikah_tempat_lahir` VARCHAR(191) NOT NULL,
    `nikah_tgl_lahir` DATE NOT NULL,
    `nikah_suku` VARCHAR(191) NOT NULL,
    `nikah_agama` INTEGER NOT NULL,
    `nikah_nik` VARCHAR(191) NOT NULL,
    `nikah_alamat` VARCHAR(191) NOT NULL,
    `nikah_kepentingan` VARCHAR(191) NOT NULL,
    `nikah_ttd` INTEGER NULL,
    `nikah_createdBy` INTEGER NULL,
    `nikah_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nikah_updated` DATETIME(3) NOT NULL,
    `nikah_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`nikah_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skck` (
    `skck_id` INTEGER NOT NULL AUTO_INCREMENT,
    `skck_nomor` VARCHAR(191) NULL,
    `skck_nama` VARCHAR(191) NOT NULL,
    `skck_tempat_lahir` VARCHAR(191) NOT NULL,
    `skck_tanggal_lahir` DATE NOT NULL,
    `skck_jk` INTEGER NOT NULL,
    `skck_agama` INTEGER NOT NULL,
    `skck_statusKawin` INTEGER NOT NULL,
    `skck_pekerjaan` VARCHAR(191) NOT NULL,
    `skck_suku` VARCHAR(191) NOT NULL,
    `skck_nik` VARCHAR(191) NOT NULL,
    `skck_alamat` VARCHAR(191) NOT NULL,
    `skck_pendidikan_terakhir` INTEGER NOT NULL,
    `skck_kepentingan` VARCHAR(191) NOT NULL,
    `skck_ttd` INTEGER NULL,
    `skck_createdBy` INTEGER NULL,
    `skck_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `skck_updated` DATETIME(3) NOT NULL,
    `skck_deleted` DATETIME(3) NULL,

    PRIMARY KEY (`skck_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `belumNikah` ADD CONSTRAINT `belumNikah_nikah_ttd_fkey` FOREIGN KEY (`nikah_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `belumNikah` ADD CONSTRAINT `belumNikah_nikah_createdBy_fkey` FOREIGN KEY (`nikah_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skck` ADD CONSTRAINT `skck_skck_ttd_fkey` FOREIGN KEY (`skck_ttd`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skck` ADD CONSTRAINT `skck_skck_createdBy_fkey` FOREIGN KEY (`skck_createdBy`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
