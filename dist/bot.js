"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const constants_1 = require("./constants");
const UsersEmmiter_1 = require("./UsersEmmiter");
// const BOT_TOKEN = '5183968043:AAGYVOk0lK-PjMWI4_bbB3pWsBQkTBw2OJ8';
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
const users = new UsersEmmiter_1.UsersEmmiter();
bot.start((ctx) => ctx.reply(constants_1.MESSAGES.start));
bot.command(constants_1.COMMANDS_LIST.help, (ctx) => {
    ctx.reply('⚡️ COMMANDS ⚡️', constants_1.HELP_COMMAND_OPTIONS);
});
bot.command(constants_1.COMMANDS_LIST.subscribe, async (ctx) => {
    const userData = await ctx.message;
    if (users.isUserExist(userData)) {
        return ctx.reply(constants_1.MESSAGES.exist)
            .catch(() => ctx.reply(constants_1.MESSAGES.error));
    }
    users.subscribe(userData);
    console.log(users.getUserList());
    ctx.reply(constants_1.MESSAGES.add)
        .catch(() => ctx.reply(constants_1.MESSAGES.error));
});
bot.command(constants_1.COMMANDS_LIST.unsubscribe, async (ctx) => {
    const userData = await ctx.message;
    if (users.isUserListEmpty(userData)) {
        return ctx.reply(constants_1.MESSAGES.emptyList)
            .catch(() => ctx.reply(constants_1.MESSAGES.error));
    }
    users.unsubscribe(userData);
    console.log(users.getUserList());
    ctx.reply(constants_1.MESSAGES.remove)
        .catch(() => ctx.reply(constants_1.MESSAGES.error));
});
bot.command(constants_1.COMMANDS_LIST.call, async (ctx) => {
    const userData = await ctx.message;
    if (users.isUserListEmpty(userData)) {
        return ctx.reply(constants_1.MESSAGES.emptyList)
            .catch(() => ctx.reply(constants_1.MESSAGES.error));
    }
    const message = users.getCallAllUserMessage(userData);
    ctx.reply(message, constants_1.CALL_ALL_USER_OPTIONS)
        .catch(() => ctx.reply(constants_1.MESSAGES.error));
});
bot.command(constants_1.COMMANDS_LIST.quit, (ctx) => {
    ctx.leaveChat();
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
//# sourceMappingURL=bot.js.map