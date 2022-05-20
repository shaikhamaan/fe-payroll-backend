import express from "express";
import Prisma from "@prisma/client";
import xlsxj from "xlsx-to-json";
import multer from "multer";
import path from "path";

const route = express.Router();

const { PrismaClient } = Prisma;

const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

route.get("/", async (req, res) => {
  try {
    const users = await prisma.employee.findMany();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

route.get("/getdata/:employeecode", async (req, res) => {
  const { employeecode } = req.params;

  try {
    const employee = await prisma.employee.findFirst({
      where: {
        employee_code: employeecode,
      },
    });

    if (!employee) {
      throw "Employee Not Found";
    }

    res.send({ status: "success", message: "Employee Found", data: employee });
  } catch (error) {
    res.send({ status: "error", message: "Employee Not Found", data: error });
  }
});

route.post("/", async (req, res) => {
  const data = req.body;

  try {
    const user = await prisma.employee.create({
      data: {
        ...data,
      },
    });

    res.json({
      status: "success",
      message: "Employee Added Successfully",
      data: user,
    });
  } catch (err) {
    res.send({ status: "error", message: "Something is Wrong", error: err });
  }
});

route.post("/update", async (req, res) => {
  const data = req.body;

  try {
    const user = await prisma.employee.update({
      where: {
        employee_code: data.employee_code,
      },
      data: {
        ...data,
      },
    });

    res.json({
      status: "success",
      message: "Employee Data Update Successfully",
      data: user,
    });
  } catch (err) {
    res.send({ status: "error", message: "Something is Wrong", error: err });
  }
});

const addUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prisma.employee.create({
        data: {
          ...data,
        },
      });
      resolve({ status: "Success" });
    } catch (err) {
      resolve({ status: "Fail" });
    }
  });
};

// Mass Upload

route.post("/massupload", upload.single("file"), (req, res, next) => {
  const __dirname = path.resolve();
  xlsxj(
    {
      input: path.join(__dirname, "/uploads/Fe.xlsx"),
      output: "output.json",
    },
    async function (err, result) {
      if (err) {
      } else {
        const failedEntries = [];

        for (let i = 0; i < result.length; i++) {
          const status = await addUser(result[i]);

          if (status.status == "Fail") {
            failedEntries.push(result[i]);
          }
        }

        res.json({ message: "success", failedEntries: failedEntries });
      }
    }
  );
});

// app.post("/image", mid.single("image"), async (req, res) => {
//   console.log(req.file);
//   let bufferstream = new stream.PassThrough();
//   bufferstream.end(req.file.buffer);

//   const data = await drive.uploadFile(
//     req.file.originalname,
//     req.file.mimetype,
//     bufferstream
//   );
//   console.log(data);
//   res.json({ message: "hi" });
// });

export default route;
