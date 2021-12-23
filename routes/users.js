import Prisma from "@prisma/client";
import express from "express";
import bcrypt from "bcryptjs";

const { PrismaClient } = Prisma;

const route = express.Router();

const prisma = new PrismaClient();

route.post("/newuser", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const p = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: p,
        role: role,
      },
    });
    res.send({
      status: "success",
      message: "Admin Added Successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "User already exist or Server Error",
    });
  }
});

route.post("/authuser", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    const p = user.password;

    const verify = await bcrypt.compare(password, p);

    if (verify) {
      res.send({
        status: "success",
        role: user.role,
        message: "Login Successful",
      });
    } else {
      res.send({
        status: "error",
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: "Something is Wrong",
      error: error,
    });
  }
});

export default route;
