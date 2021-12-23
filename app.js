import express from "express";
import cors from "cors";
import employee from "./routes/employee.js";
import attendance from "./routes/attendance.js";
import payscale from "./routes/payscale.js";
import awards from "./routes/awards.js";
import users from "./routes/users.js";
import reports from "./routes/reports.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/employee", employee);
app.use("/attendance", attendance);
app.use("/reports", reports);
app.use("/awards", awards);
app.use("/users", users);
app.use("/payscale", payscale);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
