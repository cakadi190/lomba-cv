-- CreateTable
CREATE TABLE `Portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `techstack` JSON NOT NULL,
    `desc` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Portfolio_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
