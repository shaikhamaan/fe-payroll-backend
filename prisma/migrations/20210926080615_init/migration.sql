/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Employee` (
    `RFID_Card_no` VARCHAR(191) NOT NULL,
    `employee_code` VARCHAR(191) NOT NULL,
    `employee_Name` VARCHAR(191) NOT NULL,
    `entry_made_on` DATETIME(3) NOT NULL,
    `entry_added_by` VARCHAR(191) NOT NULL,
    `employee_grade` VARCHAR(191) NOT NULL,
    `work_location` VARCHAR(191) NOT NULL,
    `vehicle_group` VARCHAR(191) NOT NULL,
    `experience_status` VARCHAR(191) NOT NULL,
    `years_of_experience` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `mobile_no` INTEGER NOT NULL,
    `mobile_relation` VARCHAR(191) NOT NULL,
    `whatsapp_status` VARCHAR(191) NOT NULL,
    `emergency_contact` VARCHAR(191) NOT NULL,
    `emergency_person_relation` VARCHAR(191) NOT NULL,
    `emergency_contact_no` INTEGER NOT NULL,
    `bank_account_name` VARCHAR(191) NOT NULL,
    `account_relation` VARCHAR(191) NOT NULL,
    `bank_account_no` INTEGER NOT NULL,
    `bank_ifsc_code` VARCHAR(191) NOT NULL,
    `bank_branch` VARCHAR(191) NOT NULL,
    `pay_scale_term` VARCHAR(191) NOT NULL,
    `pay_scale` INTEGER NOT NULL,
    `pay_scale_type` VARCHAR(191) NOT NULL,
    `payscale_per_hour` INTEGER NOT NULL,

    UNIQUE INDEX `Employee_RFID_Card_no_key`(`RFID_Card_no`),
    UNIQUE INDEX `Employee_employee_code_key`(`employee_code`),
    PRIMARY KEY (`employee_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
