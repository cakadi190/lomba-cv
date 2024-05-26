-- CreateTable
CREATE TABLE `Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `web` VARCHAR(191) NULL,
    `level` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,
    `studyProgram` VARCHAR(191) NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NULL,
    `place` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orgName` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Career` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Award` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event` VARCHAR(191) NOT NULL,
    `award` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `year` INTEGER NOT NULL,
    `rank` INTEGER NULL,
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
