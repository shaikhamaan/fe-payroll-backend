import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
console.log(process.env.CLIENT_SECRET);

export default bot;
