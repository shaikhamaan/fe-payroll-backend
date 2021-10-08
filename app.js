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
  try{
    const users = await prisma.employee.findMany()
    res.json(users)
  }
  catch(error)
  {
    res.json(error)
  }
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
    res.json({status:"success", message:"Employee Added Successfully",data: user})
  }
  catch (err) {
    console.log(err);
    res.send({status:"error", message:"Something is Wrong",error:err})
  }
})


app.put('/', async (req, res) => {


})

app.delete('/:id', async (req, res) => {

})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server Started');
})