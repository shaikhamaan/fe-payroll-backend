import bot from './mainbot.js'
import moment  from 'moment';
import prisma from './prismaClient.js';

export default bot.command('/register',async(ctx)=>{

    const body = ctx.message.text

    var data = body.split(' ')

    data = data.filter(e => e);

    const employee_code = String(data[1])
    

    let result
    try {
        result = await prisma.telegram.findFirst({
            where:
            {
                employee_code : employee_code
            }
        })

        if(result)
        {
            ctx.reply('This Employee has been already registered .... If You think there is a mistake contact your administrator')
            return
        }
        
    } catch (error) {
        return
    }

    if(!result)
    {
        try {
            const employee = await prisma.employee.findFirst({
                where:{
                    employee_code: employee_code
                },
                select:{
                    rfid_card_no:true,
                }
            })
            if(employee)
            {
                try {
                    const newReg = await prisma.telegram.create({
                        data :{
                            employee_code: employee_code,
                            rfid_card_no: employee.rfid_card_no,
                            telegramid : String(ctx.chat.id)
                        }
                        
                    })

                    ctx.reply(`Congrats, You successfully registered and Subscribed\nEmployee Code : ${employee_code}`)
                    return
                } catch (error) {
                    ctx.reply('Your Request is not recognized.Please enter valid details')
                }
            }
        } catch (error) {
            ctx.reply('Your Request is not recognized.Please enter valid details')
        }
    }
    

    
})