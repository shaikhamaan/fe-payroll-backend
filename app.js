import Prisma from '@prisma/client';
import express from 'express';
import moment from 'moment';

const { PrismaClient } = Prisma;

const app = express();

const prisma = new PrismaClient();


app.use(express.json())

app.get('/', async (req,res) =>{
    const users = await prisma.employee.findMany()
    res.json(users)
})


app.post('/', async (req,res) =>{
    const data = req.body;
   console.log(data.entry_made_on);
    const dat = moment(data.entry_made_on,'YYYY-MM-DD HH:mm:ss');
    data.entry_made_on = moment(dat).format('YYYY-MM-DD HH:mm:ss');
    const user = await prisma.employee.create({
      data : {
        ...data
      }
    })
    res.json(user)
})


app.put('/', async (req,res) =>{

    
})

app.delete('/:id', async (req,res) =>{
    
})



app.listen(3000,() =>{
  console.log('Server Started');
})