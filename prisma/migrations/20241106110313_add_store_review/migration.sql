/*
  Warnings:

  - You are about to drop the `member_favor_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_favor_category` DROP FOREIGN KEY `member_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_favor_category` DROP FOREIGN KEY `member_favor_category_member_id_fkey`;

-- AlterTable
ALTER TABLE `food_category` ADD COLUMN `column` VARCHAR(250) NULL,
    MODIFY `name` VARCHAR(250) NOT NULL;

-- DropTable
DROP TABLE `member_favor_category`;

-- CreateTable
CREATE TABLE `store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regionId` INTEGER NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `address` VARCHAR(250) NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `term` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `optional` BOOLEAN NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memberprefer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `reward` INTEGER NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `missionSpec` LONGTEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `membermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `missionId` INTEGER NOT NULL,
    `status` VARCHAR(250) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `body` LONGTEXT NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `imageUrl` LONGTEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memberagree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `termsId` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL,
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberprefer` ADD CONSTRAINT `memberprefer_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberprefer` ADD CONSTRAINT `memberprefer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membermission` ADD CONSTRAINT `membermission_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `membermission` ADD CONSTRAINT `membermission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewimage` ADD CONSTRAINT `reviewimage_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewimage` ADD CONSTRAINT `reviewimage_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberagree` ADD CONSTRAINT `memberagree_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `memberagree` ADD CONSTRAINT `memberagree_termsId_fkey` FOREIGN KEY (`termsId`) REFERENCES `term`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
