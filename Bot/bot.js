import { Telegraf } from "telegraf";
import 'dotenv/config'


//const TOKEN = "6536890026:AAHNrEU4RIrKBWCEmxL8oataVlOwHKDPeGk"
//const TOKEN2= "6495982615:AAHYvtQdqNoIi-5DEljNkwkOS_5_tnpN8k8"

let token = process.env.TOKEN || ""

const bot = new Telegraf(token);


const web_link = "telegram-app-2.vercel.app";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();


