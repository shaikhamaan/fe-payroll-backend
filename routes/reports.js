import express from "express";
import generatePDF from "../assets/generatePdf.js";
import getReportByDate from "../assets/dailyReport.js";
import getReportByMonth from "../assets/monthReport.js";
import massSalaryData from "../assets/massSalaryData.js";

const route = express.Router();

route.post("/report", getReportByDate, (req, res, next) => {
  res.send({ status: "error", message: "Something is Wrong" });
});

route.post("/month", getReportByMonth, (req, res, next) => {
  res.send({ status: "error", message: "Something is wrong" });
});

route.get("/getsalary", generatePDF, async (req, res) => {
  res.send(
    "<H1> Unable to generate pdf receipt, please enter valid details..... </H1>"
  );
});

route.post("/masssalary", massSalaryData, async (req, res) => {
  res.send(
    "<H1> Unable to process your query, please enter valid details..... </H1>"
  );
});

export default route;
