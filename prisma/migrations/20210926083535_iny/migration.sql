/*
  Warnings:

  - You are about to drop the column `employee_Name` on the `employee` table. All the data in the column will be lost.
  - Added the required column `employee_mame` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `employee_Name`,
    ADD COLUMN `employee_mame` VARCHAR(191) NOT NULL;
