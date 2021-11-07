/*
  Warnings:

  - You are about to drop the column `punch_time` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `date` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payscale_employee_grade_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "punch_time",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "timestamp" TEXT NOT NULL;
