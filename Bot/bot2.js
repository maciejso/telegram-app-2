const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters')

require('dotenv/config')

const bot = new Telegraf(process.env.TOKEN2);

bot.use((ctx, next) => {
  if (ctx.message?.text)
  console.log(`Received message: ${ctx.message.text}`);
  next();
});


bot.hears('Show Reply Keyboard', (ctx) => {
  const keyboard = Markup.keyboard([
    ['Button 1', 'Button 2'],
    ['Button 3'],
  ]).resize();

  return ctx.reply('Choose an option:', keyboard);
});

bot.command('alert', async (ctx) => {
  // Create an inline keyboard with a button to launch the mini app
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Launch Mini App', 'launch_mini_app'),
  ]);

  // Send a message with the inline keyboard
  await ctx.reply('Click the button to launch the mini app:', keyboard);
});

// Handle the button press to launch the mini app
bot.action('launch_mini_app', async (ctx) => {
  // Placeholder URL for the mini app
  //const miniAppUrl = 'https://telegram-app-2.vercel.app/';
  const miniAppUrl = 'https://t.me/intenziabot/myapp';

  // Perform actions to launch your mini app (open the URL)
  await ctx.reply(`Launching mini app. Open this URL: ${miniAppUrl}`);
});

bot.command('help', async (ctx) => {
  // List of available commands
  const availableCommands = [
    '/start - Start the bot',
    '/alert - Launch the mini app',
    '/help - Display available commands',
  ];

  // Send a message with the list of available commands
  await ctx.reply(`Available commands:\n${availableCommands.join('\n')}`);
});


bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  // Explicit usage
  // await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.botInfo.username}`)

  // Using context shortcut
  await ctx.reply(`${ctx.message.text}`)
})

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
  const result = []
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  await ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))