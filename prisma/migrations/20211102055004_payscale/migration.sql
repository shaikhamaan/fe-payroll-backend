-- CreateTable
CREATE TABLE "Payscale" (
    "id" SERIAL NOT NULL,
    "employee_grade" TEXT NOT NULL,
    "pay_scale_term" TEXT NOT NULL,
    "pay_scale_type" TEXT NOT NULL,
    "pay_scale" TEXT NOT NULL,

    CONSTRAINT "Payscale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payscale_employee_grade_key" ON "Payscale"("employee_grade");
