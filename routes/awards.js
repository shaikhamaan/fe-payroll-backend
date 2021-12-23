import Prisma from "@prisma/client";
import express from "express";
import moment from "moment";

const { PrismaClient } = Prisma;

const route = express.Router();

const prisma = new PrismaClient();
route.post("/", async (req, res) => {
  const { date, employee_code, penalty_value, penalty_description } = req.body;
  const newDate = moment(date).format("YYYY-MM-DD");
  try {
    const user = await prisma.perks.create({
      data: {
        date: String(newDate),
        employee_code: employee_code,
        penalty_value: penalty_value,
        penalty_description: penalty_description,
      },
    });
    res.json({
      status: "success",
      message: "Penalty Added Successfully",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: "Something is Wrong", error: error });
  }
});

export default route;
