import { Telegraf, Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import * as dotenv from "dotenv";

dotenv.config()
const BOT_TOKEN: string = process.env.BOT_API_TOKEN as string;

if ( BOT_TOKEN === undefined ) {
    throw new Error ('BOT API TOKEN is NOT specified.')
}

const bot: Telegraf<Context<Update>> =  new Telegraf(BOT_TOKEN);

bot.telegram.setMyCommands(
  [
    {command: "cmd1",description:"placeholder"},
    {command: "cmd2",description:"placeholder"},
    {command: "cmd3",description:"placeholder"},
    {command: "cmd4",description:"placeholder"},
    {command: "cmd5",description:"placeholder"},
  ]
)

bot.start(
  async (ctx) => {
    await ctx.reply(
      `Hello, ${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    ); 
  }
)

bot.launch();

// stop gracefully
process.once('SIGINT',() => bot.stop('SIGINT'));
process.once('SIGTERM',() => bot.stop('SIGTERM'));