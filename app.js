import Prisma from '@prisma/client';
import express from 'express';
import moment from 'moment';
import cors from 'cors'
import xlsxj from 'xlsx-to-json'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { rejects } from 'assert';

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

const addUser = async (data) =>{
  return new Promise(async (resolve,reject)=>{
    try {
      const user = await prisma.employee.create({
        data: {
          ...data
        }
        
      })
      resolve({status:"Success"})
    } catch (err) {
      resolve({status:"Fail"})
    }

  })
}

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

      for(let i = 0;i < result.length;i++)
      {
        const status = await addUser(result[i])
        console.log(status);

        if(status.status == 'Fail'){
          failedEntries.push(result[i])
        }
        
      }

      res.json({message:"success",failedEntries:failedEntries})
    }
  });

})



app.put('/', async (req, res) => {


})

app.delete('/:id', async (req, res) => {

})


// Adding attendence
app.post('/attendance', (req, res) => {


  const { rfid, date, time } = req.query

  console.log(rfid, date, time);
  res.send("Api Called")
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server Started');
})