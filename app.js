import Prisma from '@prisma/client';
import express from 'express';
import moment from 'moment';
import cors from 'cors'
import xlsxj from 'xlsx-to-json'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit'
import { rejects } from 'assert';
import getSalaryData from './salaryData.js'
import generatePDF from './calculator.js';
import getReportByDate from './dailyReport.js';
import getReportByMonth from './monthReport.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})



const upload = multer({ storage: storage })

const { PrismaClient } = Prisma;

const app = express();

const prisma = new PrismaClient();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  try {
    const users = await prisma.employee.findMany()
    res.json(users)
  }
  catch (error) {
    res.json(error)
  }
})



app.get('/getdata/:employeecode', async (req, res) => {
  const { employeecode } = req.params
  console.log(employeecode);

  try {
    const employee = await prisma.employee.findFirst({
      where: {
        employee_code: employeecode
      }
    })

    if (!employee) {
      throw "Employee Not Found";
    }

    res.send({ status: "success", message: "Employee Found", data: employee })
  }
  catch (error) {
    res.send({ status: "error", message: "Employee Not Found", data: error })
  }

})


app.post('/', async (req, res) => {
  const data = req.body;

  console.log(data);
  try {

    const user = await prisma.employee.create({
      data: {
        ...data
      }
    })

    console.log('Added');
    res.json({ status: "success", message: "Employee Added Successfully", data: user })
  }
  catch (err) {
    console.log(err);
    res.send({ status: "error", message: "Something is Wrong", error: err })
  }
})


app.post('/update', async (req, res) => {
  const data = req.body;

  console.log(data);
  try {

    const user = await prisma.employee.create({
      where:{
        employee_code: data.employee_code
      },
      data: {
        ...data
      }
    })

    console.log('Added');
    res.json({ status: "success", message: "Employee Added Successfully", data: user })
  }
  catch (err) {
    console.log(err);
    res.send({ status: "error", message: "Something is Wrong", error: err })
  }
})


const addUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prisma.employee.create({
        data: {
          ...data
        }

      })
      resolve({ status: "Success" })
    } catch (err) {
      resolve({ status: "Fail" })
    }

  })
}



// Mass Upload

app.post('/massupload', upload.single('file'), (req, res, next) => {
  const __dirname = path.resolve();

  xlsxj({
    input: path.join(__dirname, '/uploads/Fe.xlsx'),
    output: "output.json"
  }, async function (err, result) {
    if (err) {
      console.error(err);
    } else {

      const failedEntries = []

      for (let i = 0; i < result.length; i++) {
        const status = await addUser(result[i])


        if (status.status == 'Fail') {
          failedEntries.push(result[i])
        }

      }

      res.json({ message: "success", failedEntries: failedEntries })
    }
  });

})



app.put('/', async (req, res) => {


})

app.delete('/:id', async (req, res) => {

})


// Adding attendence
app.post('/attendance', async (req, res) => {
  const { rfid_card_no, date, time } = req.body

  const newDate = moment(date).format('YYYY-MM-DD');
  const dateTime = new Date(`${date} ${time}`)

  const timestamp = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');

  try {
    const user = await prisma.attendance.create({
      data: {
        rfid_card_no: rfid_card_no,
        date: String(newDate),
        timestamp: String(timestamp)
      }
    })
    res.json({ status: "success", message: "Attendance Added Successfully", data: user })
  } catch (error) {
    console.log(error);
    res.send({ status: "error", message: "Something is Wrong", error: error })
  }
})

app.get('/attendance', async (req, res) => {
  const { rfid_card_no } = req.body

  console.log(rfid_card_no);
  try {
    const users = await prisma.attendance.findMany({
      where: {
        rfid_card_no: String(rfid_card_no)
      }
    })
    res.json(users)
  }
  catch (error) {
    res.json(error)
  }
})



// Salary Receipt

app.get('/getsalary', generatePDF, async (req, res) => {

  res.send('<H1> Unable to generate pdf receipt, please enter valid details..... </H1>')
  

})



// Incentives/Penalty
app.post('/perks', async (req, res) => {
 const  { date, employee_code, penalty_value, penalty_description } = req.body
 const newDate = moment(date).format('YYYY-MM-DD');
  try {
    const user = await prisma.perks.create({
      data: {
        date: String(newDate),
        employee_code:employee_code,
        penalty_value: penalty_value,
        penalty_description: penalty_description
      }
    })
    res.json({ status: "success", message: "Penalty Added Successfully", data: user })
  } catch (error) {
    res.json({ status: "error", message: "Something is Wrong", error: error })
  }

})

app.post('/payscale', async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.payscale.create({
      data: {
        ...data
      }
    })
    res.json({ status: "success", message: "Payscale Added Successfully", data: user })
  } catch (error) {
    res.json({ status: "error", message: "Something is Wrong", error: error })
  }

})


app.post('/report',getReportByDate,(req,res,next)=>{

  res.send({ status: "error", message: "Something is Wrong"})

})

app.get('/month',getReportByMonth,(req,res,next) => {
  res.send({ status : "error", message: "Something is wrong"})
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
})













