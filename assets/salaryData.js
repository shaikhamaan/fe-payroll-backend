import Prisma from '@prisma/client';

import moment from 'moment';


const { PrismaClient } = Prisma;

const db = new PrismaClient();


// salary part
const getSalaryData = async (employee_code, startDate, endDate) => {

    let date = startDate;
    let rfid
    let data
    let pay

    try {
        data = await db.employee.findFirst({
            where: {
                employee_code: String(employee_code)
            }
        })

    }
    catch (error) {
        return { status: "error", message: "Employee Not Found" }
    }

    try {
        pay = await db.payscale.findFirst({
            where: {
                employee_grade: data.employee_grade,
                pay_scale_term: data.pay_scale_term,
                pay_scale_type: data.pay_scale_type
            }
        })
    } catch (error) {
        return ({ status: "error", message: "Error in getting employee pay" })
    }

    if (!data) {
        return ({ status: "error", message: "Employee Not Found", data: "Employee Not Found" })
    }

    rfid = data.rfid_card_no


    const salaryDetails = [];

    let totalSalary = 0;
    let extra_hours = 0

    let amount = parseInt(pay.pay_scale)


    // Salary Logic

    for (let date = startDate; date <= endDate; date = moment(date).add(1, 'days').format('YYYY-MM-DD')) {
        let salaryData = await getSalaryDataByDate(rfid, date);
        if (salaryData.length > 0) {
            totalSalary += amount;
        }

        if (salaryData.length > 3) {
            const start = new Date(salaryData[2].timestamp);
            const end = new Date(salaryData[3].timestamp);
            const lateStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
            const lateEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
            extra_hours += moment.duration(moment(lateEnd).diff(moment(lateStart))).asHours();
        }
        
        if(salaryData.length > 0)
        salaryDetails.push([date, ...salaryData]);


    }

    totalSalary += 50 * extra_hours;

    // For Monthly fixed employees

    if(pay.pay_scale_term == 'Monthly Fixed'){
        totalSalary = amount
    }


    // Incentive or penalty addition
    let penalty_points = 0
    for (let date = startDate; date <= endDate; date = moment(date).add(1, 'days').format('YYYY-MM-DD')) {
       let penalty = await getPenaltyDataByDate(employee_code,date)
    
       penalty.forEach((day) => {
           let points = parseInt(day.penalty_value)
           penalty_points += points
       })

    }

    // adding salary with penalty
    totalSalary += 5*penalty_points


    return {
        status: "Success",
        employee_code: employee_code,
        employee_name: data.employee_name,
        employee_grade: data.employee_grade,
        pay_scale_term: pay.pay_scale_term,
        penalty_points: penalty_points,
        pay_scale: pay.pay_scale,
        startdate: startDate, enddate: endDate, 
        data: salaryDetails,
        total_salary: totalSalary,
        extra_hours: extra_hours
    };
}


const getSalaryDataByDate = async (rfid, date) => {

    let salaryData = await db.attendance.findMany({
        where: {
            rfid_card_no: rfid,
            date: date
        }
    });
    return salaryData;
}

const getPenaltyDataByDate = async(employee_code, date) =>{
    let penalty = await db.perks.findMany({
        where:{
            employee_code: employee_code,
            date: date
        }
    })

    return penalty
}



export default getSalaryData












