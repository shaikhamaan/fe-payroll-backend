import bot from './mainbot.js'
import moment  from 'moment';
import prisma from './prismaClient.js';


export default bot.command('salary',async(ctx)=>{

    const body = ctx.message.text
    var data = body.split(' ')

    data = data.filter(e => e);
    
    let startDate, endDate
    try {
        startDate = data[1]
        endDate = data[2]
    } catch (error) {
        ctx.reply('You are not registered or Entered wrong details.Please try again')
    }
    
    if(startDate == "" || startDate == undefined || endDate == undefined || endDate == "")
    {
        ctx.reply('You are not registered or Entered wrong details. Please try again')
        return
    }


    // checking which user is associated with this
    const telegramid = String(ctx.chat.id)
    let employee_code
    try {
        const employee = await prisma.telegram.findFirst({
            where:{
                telegramid: telegramid
            },
            select:{
                employee_code: true
            }
        })
        if(employee){
            employee_code = employee.employee_code
        }
        else
        {
            throw 404;
        }
    
    } catch (error) {
        ctx.reply('You are not registered or Entered wrong details.Please try again')
        return
    }


    ctx.telegram.sendChatAction(ctx.chat.id,'upload_document')
    try {
        await ctx.telegram.sendDocument(ctx.chat.id,`https://freshexp-server.herokuapp.com/getsalary?employee_code=${employee_code}&start=${startDate}&end=${endDate}`,{
            caption: `Your Salary Report from ${startDate} to ${endDate}`,
            reply_to_message_id: ctx.message.message_id
        })
    } catch (error) {
        ctx.reply('You are not registered or Entered wrong details.Please try again')
    }
})

