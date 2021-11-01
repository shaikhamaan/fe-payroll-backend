-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "rfid_card_no" TEXT NOT NULL DEFAULT E'0',
    "employee_code" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "entry_made_on" TEXT NOT NULL,
    "employee_photo" TEXT NOT NULL DEFAULT E'0',
    "entry_added_by" TEXT NOT NULL,
    "employee_grade" TEXT NOT NULL,
    "work_location" TEXT NOT NULL,
    "vehicle_group" TEXT NOT NULL,
    "experience_status" TEXT NOT NULL,
    "years_of_experience" TEXT NOT NULL DEFAULT E'0',
    "education" TEXT NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "mobile_relation" TEXT NOT NULL,
    "whatsapp_status" TEXT NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "emergency_person_relation" TEXT NOT NULL,
    "emergency_contact_no" TEXT NOT NULL,
    "bank_account_name" TEXT NOT NULL,
    "account_relation" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_no" TEXT NOT NULL,
    "bank_ifsc_code" TEXT NOT NULL,
    "bank_branch" TEXT NOT NULL,
    "passbook_photo" TEXT NOT NULL,
    "aadhar_no" TEXT NOT NULL,
    "pay_scale_term" TEXT NOT NULL DEFAULT E'0',
    "pay_scale" TEXT NOT NULL DEFAULT E'0',
    "pay_scale_type" TEXT NOT NULL DEFAULT E'0',
    "payscale_per_hour" TEXT NOT NULL DEFAULT E'0',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "rfid_card_no" TEXT NOT NULL,
    "punch_time" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perks" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "employee_no" TEXT NOT NULL,
    "average_packs" TEXT NOT NULL,
    "actual_packs" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Perks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employee_code_key" ON "Employee"("employee_code");
