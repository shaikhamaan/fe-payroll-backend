-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfid_card_no` VARCHAR(191) NOT NULL DEFAULT 'S',
    `employee_code` VARCHAR(191) NOT NULL,
    `employee_name` VARCHAR(191) NOT NULL,
    `entry_made_on` VARCHAR(191) NOT NULL,
    `employee_photo` VARCHAR(191) NOT NULL,
    `entry_added_by` VARCHAR(191) NOT NULL,
    `employee_grade` VARCHAR(191) NOT NULL,
    `work_location` VARCHAR(191) NOT NULL,
    `vehicle_group` VARCHAR(191) NOT NULL,
    `experience_status` VARCHAR(191) NOT NULL,
    `years_of_experience` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `mobile_no` VARCHAR(191) NOT NULL,
    `mobile_relation` VARCHAR(191) NOT NULL,
    `whatsapp_status` VARCHAR(191) NOT NULL,
    `emergency_contact` VARCHAR(191) NOT NULL,
    `emergency_person_relation` VARCHAR(191) NOT NULL,
    `emergency_contact_no` VARCHAR(191) NOT NULL,
    `bank_account_name` VARCHAR(191) NOT NULL,
    `account_relation` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `bank_account_no` VARCHAR(191) NOT NULL,
    `bank_ifsc_code` VARCHAR(191) NOT NULL,
    `bank_branch` VARCHAR(191) NOT NULL,
    `passbook_photo` VARCHAR(191) NOT NULL,
    `aadhar_no` VARCHAR(191) NOT NULL,
    `pay_scale_term` VARCHAR(191) NOT NULL,
    `pay_scale` VARCHAR(191) NOT NULL,
    `pay_scale_type` VARCHAR(191) NOT NULL,
    `payscale_per_hour` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_employee_code_key`(`employee_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
