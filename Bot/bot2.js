const { Telegraf } = require('telegraf');
require('dotenv/config')

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new Telegraf(process.env.TOKEN);

// Middleware to log incoming messages
bot.use((ctx, next) => {
  console.log(`Received message: ${ctx.message.text}`);
  next();
});

// Command handler
bot.start((ctx) => ctx.reply('Hello! This is your bot.'));

// Launch the bot
bot.launch();