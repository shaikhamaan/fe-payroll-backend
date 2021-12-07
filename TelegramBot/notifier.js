import schedule from 'node-schedule'
import bot from './mainbot.js'
import prisma from './prismaClient.js'
import getReportByEmployee from '../assets/dailyEmployee.js'
import moment from 'moment'

// Daily Report Schedular
const job = schedule.scheduleJob("* * 21 00 * *",async()=>{
    const d = new Date()
    let subsribers
    try {
        subsribers = await prisma.telegram.findMany()
    } catch (error) {
        return
    }
    
    const date = moment(d).format('YYYY-MM-DD')



    for(let i=0;i<subsribers.length;i++)
    {
        const employee_code = subsribers[i].employee_code
        const data = await getReportByEmployee(employee_code,date)

        bot.telegram.sendMessage(subsribers[i].telegramid,data)
    }
    
}) 

export default job
