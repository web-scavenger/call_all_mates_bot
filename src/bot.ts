import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import { CALL_ALL_USER_OPTIONS, COMMANDS_LIST, HELP_COMMAND_OPTIONS, MESSAGES } from './constants';
import { UsersEmmiter } from './UsersEmmiter';

// const BOT_TOKEN = '5183968043:AAGYVOk0lK-PjMWI4_bbB3pWsBQkTBw2OJ8';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

const users = new UsersEmmiter();

bot.start((ctx) => ctx.reply(MESSAGES.start)) 

bot.command(COMMANDS_LIST.help, (ctx) => {
  ctx.reply('⚡️ COMMANDS ⚡️', HELP_COMMAND_OPTIONS)
})

bot.command(COMMANDS_LIST.subscribe, async (ctx) => {
  const userData = await ctx.message

  if(users.isUserExist(userData)){
    return ctx.reply(MESSAGES.exist)
      .catch(() => ctx.reply(MESSAGES.error))
  }

  users.subscribe(userData)

  console.log(users.getUserList())

  ctx.reply(MESSAGES.add)
    .catch(() => ctx.reply(MESSAGES.error))
})

bot.command(COMMANDS_LIST.unsubscribe, async (ctx) => {
  const userData = await ctx.message

  if(users.isUserListEmpty(userData)) {
    return ctx.reply(MESSAGES.emptyList)
      .catch(() => ctx.reply(MESSAGES.error))
  }

  users.unsubscribe(userData)

  console.log(users.getUserList())
  ctx.reply(MESSAGES.remove)
    .catch(() => ctx.reply(MESSAGES.error))

})

bot.command(COMMANDS_LIST.call, async (ctx) => {
  const userData = await ctx.message

  if(users.isUserListEmpty(userData)) {
    return ctx.reply(MESSAGES.emptyList)
      .catch(() => ctx.reply(MESSAGES.error))
  }

  const message = users.getCallAllUserMessage(userData)

  ctx.reply(message, CALL_ALL_USER_OPTIONS)
    .catch(() => ctx.reply(MESSAGES.error))
})

bot.command(COMMANDS_LIST.quit, (ctx) => {
  ctx.leaveChat();
});


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));