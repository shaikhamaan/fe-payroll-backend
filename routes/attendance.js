import Prisma from "@prisma/client";
import express from "express";
import moment from "moment";

const { PrismaClient } = Prisma;

const route = express.Router();

const prisma = new PrismaClient();

// Adding attendence
route.post("/", async (req, res) => {
  const { rfid_card_no, date, time } = req.body;

  const newDate = moment(date).format("YYYY-MM-DD");
  const dateTime = new Date(`${date} ${time}`);

  const timestamp = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");

  try {
    const user = await prisma.attendance.create({
      data: {
        rfid_card_no: rfid_card_no,
        date: String(newDate),
        timestamp: String(timestamp),
      },
    });
    res.json({
      status: "success",
      message: "Attendance Added Successfully",
      data: user,
    });
  } catch (error) {
    res.send({ status: "error", message: "Something is Wrong", error: error });
  }
});

route.post("/refill", async (req, res) => {
  const { employee_codes, date, time } = req.body;

  const newDate = moment(date).format("YYYY-MM-DD");
  const dateTime = new Date(`${date} ${time}`);

  const timestamp = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");

  try {
    for (let i = 0; i < employee_codes.length; i++) {
      const user = await prisma.attendance.create({
        data: {
          rfid_card_no: employee_codes[i].value,
          date: String(newDate),
          timestamp: String(timestamp),
        },
      });
    }
    res.json({
      status: "success",
      message: "Attendance Refill Successfull",
    });
  } catch (error) {
    res.send({ status: "error", message: "Something is Wrong", error: error });
  }
});

route.get("/", async (req, res) => {
  const { rfid_card_no } = req.body;

  try {
    const users = await prisma.attendance.findMany({
      where: {
        rfid_card_no: String(rfid_card_no),
      },
    });
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

export default route;
