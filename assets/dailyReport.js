import Prisma from '@prisma/client';

import moment from 'moment';


const { PrismaClient } = Prisma;

const db = new PrismaClient();


const getReportByDate = async (req,res,next) => {

    var { date } = req.body


    date = moment(date).format("YYYY-MM-DD")
    console.log(date);
    

    let departments 

    try {
        departments = await db.payscale.findMany({
            select:{
                employee_grade:true
            }
        })
    } catch (error) {
        next()
        return { status: "error", error:error }
    }

    var result = []

    for(let i = 0;i < departments.length;i++){
        const data = await getReportByDepartment(departments[i].employee_grade,date)
        if(data.status == 'error'){
            next()
        }
        result = result.concat(data)
    }

    res.send(result)
    

}

const getReportByDepartment = async (department, date) => {
        
    let employees

    try {
        employees = await db.employee.findMany({
            where: {
                employee_grade: department
            },
            select: {
                employee_name: true,
                rfid_card_no: true,
                employee_code: true
            }
        })
    } catch (error) {
        return { status: "error", error: error }
    }


    const data = []

    for (let i = 0; i < employees.length; i++) {

        const attendance = await db.attendance.findMany({
            where: {
                rfid_card_no: employees[i].rfid_card_no,
                date: date
            },
            select: {
                timestamp: true
            }
        })

        const rowData = {
            department:department,
            employee_code:"-",
            employee_name:"-",
            rfid_card_no:"-",
            arrival_time:"00:00:00",
            late_time:"00:00:00",
            dept_time:"00:00:00",
            early_time:"00:00:00",
            working_hrs:"0",
            over_time:"0",
            status:"A",
            remarks:"Absent"
        }
        rowData.employee_name = employees[i].employee_name
        rowData.employee_code = employees[i].employee_code
        rowData.rfid_card_no = employees[i].rfid_card_no
                
        if (attendance.length == 0) {
            
        }
        else if(attendance.length == 1)
        {
            rowData.status = "P",
            rowData.remarks = "Odd Punch"
            rowData.arrival_time = timeFormat(attendance[0].timestamp)
        }
        else
        {
            rowData.status = "P",
            rowData.remarks = "Present"
            rowData.arrival_time = timeFormat(attendance[0].timestamp)
            rowData.dept_time = timeFormat(attendance[1].timestamp)

            const start = new Date(attendance[0].timestamp);
            const end = new Date(attendance[1].timestamp);
            const startTime = moment(start).format('YYYY-MM-DD HH:mm:ss');
            const endTime = moment(end).format('YYYY-MM-DD HH:mm:ss');

            rowData.working_hrs = moment.duration(moment(endTime).diff(moment(startTime))).asHours();
            
        }
        
        // Overtime

        if(attendance.length > 3){
            const start = new Date(attendance[2].timestamp);
            const end = new Date(attendance[3].timestamp);
            const lateStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
            const lateEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
            rowData.over_time = moment.duration(moment(lateEnd).diff(moment(lateStart))).asHours();
        }


        data.push(rowData)
    }

    

    return data


}

const timeFormat = (time) => {
    return moment(time).format('HH:mm:ss')
}


export default getReportByDate