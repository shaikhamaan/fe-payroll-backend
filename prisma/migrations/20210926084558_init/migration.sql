/*
  Warnings:

  - Added the required column `bank_name` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `bank_name` VARCHAR(191) NOT NULL;
