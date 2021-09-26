/*
  Warnings:

  - Added the required column `aadhar_no` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `aadhar_no` INTEGER NOT NULL;
