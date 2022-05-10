# Employee Attendance and Payroll Management System

Radio Frequency Identification (RFID) initially is of great use in the marketing field render 
billing easy. An object within the range of 20 feet can be easily tracked with the aid of its 
unique barcode using RFID chip. It is sophisticated than the primitive barcode techniques 
as there is no need of positioning of the scanner. Cloud computing is a system which 
provides access to all software’s without installation, for a desired time period, at a 
specific cost, only with the help of a single web browser.. Interfacing RFID with cloud 
computing would be more beneficiary in solving current issues. So We are providing 
solution for Companies to enable RFID enabled attendance management system.

# Project Outcomes
- Using Wi-Fi enabled RFID reading machines from all locations to connect attendance data to a cloud central database in real-time. Linking this database to a web-based and mobile based application that in real-time displays required attendance data to administration and managers.
- Incorporating incentive or penalty reporting by factory supervisors into the mobile application. This will require the app to scan a barcode printed on employee's RFID card to identify the employee, contain some drop-downs, text-fields and photo
-  capture features for the supervisor to fill in details about why he/she is awarding an incentive or penalising an employee.
-  Web-application to incorporate salary calculation logic used by FE, to auto-calculate each employee's weekly salary. If possible, auto-generate employee-wise downloadable salary statements.

**Backend Stack Details**
- Node.js (Backend Scripting)
- PostgreSQL (Database)
- Telegraf (Official Telegram SDK for Node.js) <a href="https://core.telegram.org/bots/api"> API Reference </a> 



**Functionalities**
 - Adding New Employees
 - Manage all employee data
 - Adding attendence through RFID Card (By Calling API)
 - Employee Attendence Reports
 - Employee Salary Reports
 - Employee Payslip generation
 - Send Notifications to the employees using Telegram Bot

 
 # How to install
  - Initial Installation Requirements
    - Node.js (Latest Stable Version) <a href="https://nodejs.org/en/download/">Node.js</a>
    - PostgreSQL Database <a href="https://www.postgresql.org/download/">PostgreSQL</a>
  
 
## Installation
Install All npm dependencies
```bash
  npm install 
```

Run Project using npm:
If it is localhost then it will start at port 5000 
For deployments we need to mention PORT in the environment variables
```bash
  npm start
```
 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BOT_TOKEN` - Telegram Bot Token received from BotFather <a href="https://sendpulse.com/knowledge-base/chatbot/create-telegram-chatbot"> Reference </a>

`DATABASE_URL` - PotgreSQL Database URL for connection


# API Reference
Postman Collection Link : https://www.getpostman.com/collections/314d477d8aee8d4d36ca

Reference URL: https://documenter.getpostman.com/view/14607817/Uyxeq8sx

 - Mass Upload Sample file: See Fe.xlsx in uploads folder




 
 
