import Prisma from "@prisma/client";
import express from "express";

const { PrismaClient } = Prisma;

const route = express.Router();

const prisma = new PrismaClient();

route.get("/getpay", async (req, res) => {
  console.log(req);
  const { employee_grade, pay_scale_term } = req.query;
  console.log(pay_scale_term);
  try {
    const data = await prisma.payscale.findFirst({
      where: {
        employee_grade: employee_grade,
        pay_scale_term: pay_scale_term,
      },
    });

    res.send({
      ok: true,
      amount: data.pay_scale,
    });
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      amount: 0,
    });
  }
});

route.post("/", async (req, res) => {
  const data = req.body;

  try {
    const previousData = await prisma.payscale.findFirst({
      where: {
        employee_grade: data.employee_grade,
        pay_scale_term: data.pay_scale_term,
        pay_scale_type: data.pay_scale_type,
      },
    });

    if (previousData) {
      try {
        const grade = await prisma.payscale.deleteMany({
          where: {
            employee_grade: data.employee_grade,
            pay_scale_term: data.pay_scale_term,
            pay_scale_type: data.pay_scale_type,
          },
        });
      } catch (error) {}
    }
  } catch (error) {
    res.send(error);
  }

  try {
    const grade = await prisma.payscale.create({
      data: {
        ...data,
      },
    });
    res.json({
      status: "success",
      message: "Payscale Added Successfully",
      data: grade,
    });
  } catch (error) {
    res.json({ status: "error", message: "Something is Wrong", error: error });
  }
});

export default route;
