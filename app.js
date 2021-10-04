import Prisma from '@prisma/client';
import express from 'express';
import moment from 'moment';
import cors from 'cors'
const { PrismaClient } = Prisma;

const app = express();

const prisma = new PrismaClient();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
  const users = await prisma.employee.findMany()
  res.json(users)
})


app.post('/', async (req, res) => {
  const data = req.body;

  console.log(data);
  try {
    const dat = moment(data.entry_made_on, 'YYYY-MM-DD HH:mm:ss');
    data.entry_made_on = moment(dat).format('YYYY-MM-DD HH:mm:ss');
    const user = await prisma.employee.create({
      data: {
        ...data
      }
    })

    console.log('Added');
    res.json({message:"User Added Successfully",data: user})
  }
  catch (err) {
    console.log(err);
    res.send({message:"Something is wrong",error:err})
  }
})


app.put('/', async (req, res) => {


})

app.delete('/:id', async (req, res) => {

})



app.listen(5000, () => {
  console.log('Server Started');
})