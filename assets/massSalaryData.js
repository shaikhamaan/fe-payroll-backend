import Prisma from "@prisma/client";

import moment from "moment";

import getSalaryData from "./salaryData.js";

const { PrismaClient } = Prisma;

const db = new PrismaClient();

const massSalaryData = async (req, res, next) => {
  const { start, end } = req.body;
  console.log(start, end);

  const startDate = moment(start).format("YYYY-MM-DD");
  const endDate = moment(end).format("YYYY-MM-DD");

  let employees;

  try {
    employees = await db.employee.findMany({
      orderBy: {
        employee_grade: "asc",
      },
      select: {
        employee_code: true,
        bank_ifsc_code: true,
        bank_account_no: true,
      },
    });
  } catch (error) {
    next();
    return { status: "error", error: error };
  }

  var result = [];

  for (let i = 0; i < employees.length; i++) {
    try {
      const data = await getSalaryData(
        employees[i].employee_code,
        startDate,
        endDate
      );

      result.push({
        employee_code: data.employee_code,
        employee_name: data.employee_name,
        employee_grade: data.employee_grade,
        pay_scale_term: data.pay_scale_term,
        penalty_points: data.penalty_points,
        pay_scale: data.pay_scale,
        days_present: data.data.length,
        total_salary: data.total_salary,
        extra_hours: data.extra_hours,
        bank_ifsc_code: employees[i].bank_ifsc_code,
        bank_account_no: employees[i].bank_account_no,
      });
    } catch (error) {
      console.log(error);
    }
  }

  res.send(result);
};

export default massSalaryData;
