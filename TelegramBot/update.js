import bot from './mainbot.js'
import moment  from 'moment';
import prisma from './prismaClient.js';

export default bot.command('/update',async(ctx)=>{

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
            try {
                const update = await prisma.telegram.update({
                    where:{
                        employee_code: employee_code
                    },
                    data: {
                        telegramid: String(ctx.chat.id)
                    }
                })

                ctx.reply(`Done, This Account is now associated with Employee Number: ${employee_code}`)

            } catch (error) {
                ctx.reply('Something went wrong, Please try again')
            }
            
            return
        }
        else
        {
            throw "Not Exists";
        }
        
    } catch (error) {
        ctx.reply('This Employee is not registered .... Register first to receive updates')
        return
    }

})