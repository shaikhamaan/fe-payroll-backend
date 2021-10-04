-- DropIndex
DROP INDEX `Employee_rfid_card_no_key` ON `employee`;

-- AlterTable
ALTER TABLE `employee` MODIFY `rfid_card_no` VARCHAR(191) NOT NULL DEFAULT 'S';
