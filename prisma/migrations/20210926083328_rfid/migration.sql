/*
  Warnings:

  - You are about to drop the column `RFID_Card_no` on the `employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rfid_card_no]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rfid_card_no` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Employee_RFID_Card_no_key` ON `employee`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `RFID_Card_no`,
    ADD COLUMN `rfid_card_no` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_rfid_card_no_key` ON `Employee`(`rfid_card_no`);
