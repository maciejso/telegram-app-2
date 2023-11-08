import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import express from "express";
import 'dotenv/config';

const miniAppUrl = 'https://t.me/intenzia2bot/app2'; 
const botUrl = "https://f9bb-82-43-212-31.ngrok-free.app"
const port = process.env.PORT || 4000;

const app = express();
const bot = new Telegraf(process.env.TOKEN2);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next(); 
});

bot.telegram.setWebhook(`${botUrl}/trigger`)

app.post('/trigger', (req, res) => {
  let userId = 5852786190
  sendMessageToUser(userId, "co jest")
  res.send("Ok")
});

bot.use((ctx, next) => {
  //console.log(ctx.botInfo)
  next();
});
bot.command('trigger', (ctx) => {
  ctx.reply('The /trigger command was received!');
});

bot.hears('alert', (ctx) => {
    const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Launch Mini App', 'launch_mini_app'),
  ]);

  return ctx.reply('Launch Crypto Alert mini App:', keyboard);
});

bot.command('alert', async (ctx) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Launch Crypt Alert mini App', 'launch_mini_app'),
  ]);

  await ctx.reply('Click the button to launch the mini app:', keyboard);
});

bot.action('launch_mini_app', async (ctx) => {

  await ctx.reply(`Launching mini app. Open this URL: ${miniAppUrl}`);
});

bot.command('help', async (ctx) => {
  const availableCommands = [
    '/start - Start the bot',
    '/alert - Launch the Crypto Alerts mini app',
    '/help - Display available commands',
  ];

  await ctx.reply(`Available commands:\n${availableCommands.join('\n')}`);
});


bot.command('quit', async (ctx) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id)
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  const userId = ctx.from.id;
  console.log(`User ID: ${userId}`);

  ctx.reply(`Welcome! Your user ID is: ${userId}`);
  const userName = ctx.message.from.first_name;
  await ctx.reply(`Hi ${userName}! How can I help you.`);
})

bot.on('callback_query', async (ctx) => {
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
  const result = []
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
  await ctx.answerInlineQuery(result)
})

bot.start((ctx) => {
  const userId = ctx.from.id;
  console.log(`User ID: ${userId}`);

  ctx.reply(`Welcome! Your user ID is: ${userId}`);
});


function sendMessageToUser(userId, message) {
  bot.telegram.sendMessage(userId, message)
    .then(() => {
      console.log(`Message sent to user with ID: ${userId}`);
    })
    .catch((error) => {
      console.error(`Could not send message to the user with ID: ${userId}`, error);
    });
}

sendMessageToUser(6330525674, "co jest miszczu?");

bot.launch()

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))