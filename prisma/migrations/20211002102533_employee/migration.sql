/*
  Warnings:

  - Added the required column `employee_photo` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passbook_photo` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `employee_photo` VARCHAR(191) NOT NULL,
    ADD COLUMN `passbook_photo` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tmno` INTEGER NOT NULL,
    `employee_code` VARCHAR(191) NOT NULL,
    `employee_name` VARCHAR(191) NOT NULL,
    `gmno` INTEGER NOT NULL,
    `mode` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
