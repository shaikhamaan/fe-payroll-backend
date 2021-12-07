import Prisma from '@prisma/client';
import express from 'express';
import moment from 'moment';
import cors from 'cors'
import xlsxj from 'xlsx-to-json'
import multer from 'multer';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit'
import { rejects } from 'assert';
import getSalaryData from './assets/salaryData.js'
import generatePDF from './assets/generatePdf.js';
import getReportByDate from './assets/dailyReport.js';
import getReportByMonth from './assets/monthReport.js';
import massSalaryData from './assets/massSalaryData.js';
import bot from './TelegramBot/server.js'

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

    const user = await prisma.employee.update({
      where: {
        employee_code: data.employee_code
      },
      data: {
        ...data
      }
    })

    console.log('Added');
    res.json({ status: "success", message: "Employee Data Update Successfully", data: user })
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

app.post('/masssalary', massSalaryData, async (req, res) => {
  res.send('<H1> Unable to process your query, please enter valid details..... </H1>')
})



// Incentives/Penalty
app.post('/perks', async (req, res) => {
  const { date, employee_code, penalty_value, penalty_description } = req.body
  const newDate = moment(date).format('YYYY-MM-DD');
  try {
    const user = await prisma.perks.create({
      data: {
        date: String(newDate),
        employee_code: employee_code,
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
    const previousData = await prisma.payscale.findFirst({
      where: {
        employee_grade: data.employee_grade,
        pay_scale_term: data.pay_scale_term,
        pay_scale_type: data.pay_scale_type
      }
    })

    if (previousData) {
      try {
        const grade = await prisma.payscale.deleteMany({
          where: {
            employee_grade: data.employee_grade,
            pay_scale_term: data.pay_scale_term,
            pay_scale_type: data.pay_scale_type
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

  } catch (error) {
    res.send(error)
  }

  try {
    const grade = await prisma.payscale.create({
      data: {
        ...data
      }
    })
    res.json({ status: "success", message: "Payscale Added Successfully", data: grade })
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Something is Wrong", error: error })
  }

})


app.post('/report', getReportByDate, (req, res, next) => {

  res.send({ status: "error", message: "Something is Wrong" })

})

app.post('/month', getReportByMonth, (req, res, next) => {
  res.send({ status: "error", message: "Something is wrong" })
})



app.post('/newuser',async(req,res)=>{
  
  const {username,password, role}=req.body;
  try {
    const p = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: p,
        role: role
      }
    })
    res.send({ status : "success", message: "Admin Added Successfully", data: user })
  } catch (error) {
    res.send({ status: "error", message: "User already exist or Server Error" })
  }
})



app.post('/authuser',async(req,res)=>{
  const { username , password } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      }
    })

    const p  = user.password
    
    const verify = await bcrypt.compare(password,p)

    if(verify){
      res.send({
        status: "success",
        role: user.role,
        message: "Login Successful",
      })
    }
    else
    {
      res.send({
        status: "error",
        message: "Invalid Credentials"
      })
    }
  }
  catch (error) {
    res.send({
      status: "error",
      message: "Something is Wrong",
      error: error
    })
  }

})





const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
})













