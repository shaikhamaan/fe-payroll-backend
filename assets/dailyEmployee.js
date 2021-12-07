import Prisma from '@prisma/client';

import moment from 'moment';

const { PrismaClient } = Prisma;

const db = new PrismaClient();


const getReportByEmployee = async(employee_code,date) =>{

    let employee
    try {
        employee = await db.employee.findFirst({
            where:{
                employee_code: employee_code
            },
            select: {
                employee_name: true,
                rfid_card_no: true,
                employee_code: true,
                employee_grade:true
            }
        })
    } catch (error) {
        
    }


    const attendance = await db.attendance.findMany({
        where: {
            rfid_card_no: employee.rfid_card_no,
            date: date
        },
        select: {
            timestamp: true
        }
    })

    const rowData = {
        department:employee.employee_grade,
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
    rowData.employee_name = employee.employee_name
    rowData.employee_code = employee.employee_code
    rowData.rfid_card_no = employee.rfid_card_no
            
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
    
    return rowData
}

export default getReportByEmployee