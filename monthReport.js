import Prisma from '@prisma/client';

import moment from 'moment';


const { PrismaClient } = Prisma;

const db = new PrismaClient();



const getReportByMonth = async(req,res,next) =>{

    const { month } = req.body
  
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
        const data = await getReportByDepartment(departments[i].employee_grade,month)
        if(data.status == 'error'){
            next()
        }
        result = result.concat(data)
    }

    res.send(result)
}


const getReportByDepartment = async(department,month) =>{
    const startDate = moment(month).startOf('month').format("YYYY-MM-DD")

    const endDate = moment(month).endOf('month').format("YYYY-MM-DD")


    let employees
    try {
        employees = await db.employee.findMany({
            where:{
                employee_grade:department
            },
            select:{
                employee_code:true,
                employee_name:true,
                rfid_card_no:true
            }
        })
    } catch (error) {
        return error
    }


    let departmentResult = []


    // Individual Employee Operation

    for(let i=0;i<employees.length;i++){

        const performance = []

        for (let date = startDate; date <= endDate; date = moment(date).add(1, 'days').format('YYYY-MM-DD')){

            const dayData = {
                employee_code:"",
                employee_name:"",
                rfid_card_no:"",
                arrival_time:"",
                dept_time:"",
                working_hrs:"",
                over_time:"",
                status:"",
            }


            const attendance = await db.attendance.findMany({
                where: {
                    rfid_card_no: employees[i].rfid_card_no,
                    date: date
                },
                select: {
                    timestamp: true
                }
            })
    
            
            dayData.employee_name = employees[i].employee_name
            dayData.employee_code = employees[i].employee_code
            dayData.rfid_card_no = employees[i].rfid_card_no
    
            if (attendance.length == 0) {
                dayData.status = "A"
                dayData.arrival_time = "00.00"
                dayData.dept_time = "00.00"
                dayData.over_time = "0"
            }
            else if(attendance.length == 1)
            {
                dayData.status = "P",
                dayData.arrival_time = attendance[0].timestamp
                dayData.dept_time = "00.00"
                dayData.over_time = "0"
            }
            else
            {
                dayData.status = "P",
                dayData.arrival_time = attendance[0].timestamp
                dayData.dept_time = attendance[1].timestamp
                dayData.over_time = "0"
            }
    
    
            // Overtime
    
            if(attendance.length > 3){
                const start = new Date(attendance[2].timestamp);
                const end = new Date(attendance[3].timestamp);
                const lateStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
                const lateEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
                dayData.over_time = moment.duration(moment(lateEnd).diff(moment(lateStart))).asHours();
            }
    

            performance.push({date:date,data:dayData})


        }


        const employeeData = {
            department: department,
            employee_code: employees[i].employee_code,
            employee_name: employees[i].employee_name,
            performance: performance
        }


        departmentResult.push(employeeData)
    }

    return departmentResult
}


export default getReportByMonth