/*
  Warnings:

  - You are about to drop the column `employee_mame` on the `employee` table. All the data in the column will be lost.
  - Added the required column `employee_name` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `employee_mame`,
    ADD COLUMN `employee_name` VARCHAR(191) NOT NULL;
