import schedule from 'node-schedule'
import bot from './mainbot.js'
import prisma from './prismaClient.js'
import getReportByEmployee from '../assets/dailyEmployee.js'
import moment from 'moment'

// Daily Report Schedular
const job = schedule.scheduleJob("* * 22 00 * *",async()=>{
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
        data.date = date
        bot.telegram.sendMessage(subsribers[i].telegramid,getMessage(data))
    }
    
}) 



const getMessage = (data) =>{
    const message = 
    `Employee Attendance Report
     Date: ${data.date}
     Department : ${data.department}
     Employee Code: ${data.employee_code}
     Employee Name: ${data.employee_name}
     Arrival Time: ${data.arrival_time}
     Early Time: ${data.early_time}
     Departure Time: ${data.dept_time}
     Late Time: ${data.late_time}
     Over Time: ${data.over_time}
     Working Hours: ${data.working_hrs}
     Status: ${data.status}
     Remarks: ${data.remarks}
    `

    return message
}

export default job
