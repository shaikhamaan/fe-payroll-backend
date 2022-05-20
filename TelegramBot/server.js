import { Telegraf } from 'telegraf'
import schedule from 'node-schedule'
import bot from './mainbot.js'
import salary from './salary.js'
import register from './register.js';
import update from './update.js';
import job from './notifier.js'

bot.start((ctx)=>{
    ctx.reply(`
    Welcome to FreshExpress Bot \n Menu \n Get a Salary Report : /salary \n Register for Updates : /register \n Subscribe : /subscribe \n Unsubscribe :/unsubscribe \n`)
})

export default bot.launch()




console.log('Bot Started');