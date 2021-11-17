import Prisma from '@prisma/client';

import moment from 'moment';

import getSalaryData from './salaryData.js'

import PDFDocument from 'pdfkit'

const down = (doc,amount) =>{
    doc.moveDown(amount)
}

const generatePDF = async (req, res, next) => {
  const { employee_code, start, end } = req.query
  let salary
  const startDate = moment(start).format('YYYY-MM-DD');
  const endDate = moment(end).format('YYYY-MM-DD');
  try {
    salary = await getSalaryData(employee_code, startDate, endDate)
  }
  catch (error) {
    console.log(error);
    next()
    return
    
  }
  if(salary.status == 'error')
  {
    
      next()
      return
  }
  const filename = `Receipt.pdf`
  const doc = new PDFDocument({
    bufferPages: true, size: 'A4', margins: {
      top: 50,
      bottom: 50,
      left: 72,
      right: 72
    }
  })
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': `attachment;filename=${filename}`,
  });
  doc.on('data', (chunk) => stream.write(chunk));
  doc.on('end', () => stream.end());
  doc.fontSize(18)
  doc.font('Courier-Bold')
  doc.text('Freshexpress Logistics PVT Limited', { align: 'center' })
  doc.moveDown()
  doc.lineCap('butt')
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + 450, doc.y)
    .stroke();

  doc.moveDown();
  doc.fontSize(15)
  doc.text(`Employee Name : ${String(salary.employee_name)}`)
  down(doc,0.5)
  doc.text(`Employee Code : ${String(salary.employee_code)}`)
  down(doc,0.5)
  doc.text(`Start Date : ${String(salary.startdate)}`)
  down(doc,0.5)
  doc.text(`End Date : ${String(salary.enddate)}`)
  down(doc,0.5)
  doc.text(`Employee Grade : ${String(salary.employee_grade)}`)
  down(doc,0.5)
  doc.text(`Pay Scale Term : ${String(salary.pay_scale_term)}`)
  down(doc,0.5)
  doc.text(`Pay Scale  : ${String(salary.pay_scale)}`)
  doc.moveDown()

  doc.lineCap('butt')
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + 450, doc.y)
    .stroke();
  doc.moveDown()

  doc.text('Present Days:')
  doc.moveDown()

  for (let i = 0; i < salary.data.length; i++) {
    const day = salary.data[i]
    
    if (day.length > 1) {
      doc.text(`${String(day[0])}`)
      down(doc,0.2)
    }
  }

  doc.moveDown()
  doc.text(`Extra Hours : ${String(salary.extra_hours)}`)
  doc.moveDown()

  doc.moveDown()
  doc.text(`Penalty/Incentive Points : ${String(salary.penalty_points)}`)
  doc.moveDown()

  doc.moveTo(doc.x, doc.y)
    .lineTo(doc.x + 450, doc.y)
    .stroke();

  down(doc,1)
  doc.text(`Total Salary : ${String(salary.total_salary)}`)

  doc.end()


}


export default generatePDF