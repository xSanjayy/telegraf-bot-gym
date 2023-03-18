import { Telegraf, Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import * as dotenv from "dotenv";

dotenv.config()
const BOT_TOKEN: string = process.env.BOT_API_TOKEN as string;
const API_URL="https://api.frankfurter.app";

if ( BOT_TOKEN === undefined ) {
    throw new Error ('BOT API TOKEN is NOT specified.')
}

const bot: Telegraf<Context<Update>> =  new Telegraf(BOT_TOKEN);

bot.telegram.setMyCommands(
  [
    {command: "start",description:"to start conversation with the bot and will give the simple introduction about what the bot can able to do"},
    {command: "currency",description:"returns the current exchange rate for the given currency code"},
    {command: "convert",description:"converts the given amount from the \"from\" currency to the \"to\" currency and returns the result."},
    {command: "list",description:"displays a list of available currencies that the bot can provide exchange rates for"},
    {command: "help",description:"displays a list of available commands and a brief description of what each command does"},
    {command: "about",description:"to know about information about the bot, who created it, what API it uses, and any other relevant details"},
  ]
)


bot.start(
  async (ctx) => {
    const welcomeMessage = `Welcome to our Currency Exchange Rates bot! and I'm here to help you get 
real-time exchange rates for a wide range of currencies. You can ask me for the current exchange rate 
of any currency by typing in its name. For example, you can ask me for the exchange rate of USD, EUR, 
GBP, JPY, CAD, and more.If you need help, you can type '/help' to see a list of available commands. 
Let's get started!`;

    await ctx.reply(
      `Hello, ${ctx.message.from.first_name} ${ctx.message.from.last_name}.\n${welcomeMessage.replace(/\n/g,'')}
      `
    ); 
  }
)


bot.launch();

// stop gracefully
process.once('SIGINT',() => bot.stop('SIGINT'));
process.once('SIGTERM',() => bot.stop('SIGTERM'));