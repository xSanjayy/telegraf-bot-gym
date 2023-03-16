import { Telegraf, Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import * as dotenv from "dotenv";

dotenv.config()
const BOT_TOKEN: string = process.env.BOT_API_TOKEN as string;

if ( BOT_TOKEN === undefined ) {
    throw new Error ('BOT API TOKEN is NOT specified.')
}

const bot: Telegraf<Context<Update>> =  new Telegraf(BOT_TOKEN);


bot.on('message',
  async (ctx) => {
    await ctx.sendChatAction("typing")
   }
)



bot.launch();

// Graceful stop
process.once('SIGINT',() => bot.stop('SIGINT'));
process.once('SIGTERM',() => bot.stop('SIGTERM'));