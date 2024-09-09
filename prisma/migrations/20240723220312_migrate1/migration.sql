-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_nama` VARCHAR(191) NOT NULL,
    `user_nip` VARCHAR(191) NULL,
    `user_email` VARCHAR(191) NULL,
    `user_hp` VARCHAR(191) NOT NULL,
    `user_alamat` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_pass` VARCHAR(191) NOT NULL,
    `user_lastip` VARCHAR(191) NULL,
    `user_lastlogin` VARCHAR(191) NULL,
    `user_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_updated` DATETIME(3) NOT NULL,
    `user_deleted` DATETIME(3) NULL,

    UNIQUE INDEX `users_user_nip_key`(`user_nip`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
