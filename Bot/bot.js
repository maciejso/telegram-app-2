const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters')

require('dotenv/config')
const miniAppUrl = 'https://t.me/intenzia2bot/app2'; 

const bot = new Telegraf(process.env.TOKEN2);

bot.use((ctx, next) => {
  if (ctx.message?.text)
  console.log(`Received message: ${ctx.message.text}`);
  next();
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
    '/alert - Launch the mini app',
    '/help - Display available commands',
  ];

  await ctx.reply(`Available commands:\n${availableCommands.join('\n')}`);
});


bot.command('quit', async (ctx) => {
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  // await ctx.reply(`${ctx.message.text}`)
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

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))