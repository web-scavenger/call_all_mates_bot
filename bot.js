const { Telegraf } = require('telegraf');

// const BOT_TOKEN = '5183968043:AAGYVOk0lK-PjMWI4_bbB3pWsBQkTBw2OJ8';

const bot = new Telegraf(process.env.BOT_TOKEN);

const getUserName = (userData) => {
  return userData.username || userData.first_name || 'anonymous'
}

const CALL_ALL_USER_OPTIONS = {
  parse_mode: 'Markdown',
  disable_notification: false
}

const COMMANDS_LIST = {
  subscribe : 'subscribe',
  unsubscribe: 'unsubscribe',
  call: 'call',
  help: 'help'
}

const getHelpKeyboard = () => {
  return Object.entries(COMMANDS_LIST).reduce((acc, [key, value], index) => {
      const column = index % 2;
      const keyValue = `/${value}`
      acc[column].push(keyValue)
    return acc
  }, [[], []])
}

const getIds = (userData) => {
  const {from: {id: userId}, chat: {id: chatId} } = userData
  return {
    userId,
    chatId
  }
}

const keyboard = getHelpKeyboard()

const HELP_COMMAND_OPTIONS = {
  reply_markup: JSON.stringify({ 
      keyboard,
      one_time_keyboard: true,
      resize_keyboard: true,
      force_reply: false
  }),
};

const MESSAGES = {
  exist: 'Sorry, but you are already in the list 🤨',
  add: 'User added 🤪',
  remove: 'User removed 🥲',
  emptyList: 'There is no users, yet 🧐',
  error: 'Oops... Something went wrong 🤬',
  start: '👋 Hello, this is bot for tagging chat mates. To see the command list send /help'
}

class UsersEmmiter {
  constructor() {
    this.usersList = {};
  }

  subscribe(userData) {
    const {from, chat: {id}} = userData

    this.usersList = {
      ...this.usersList, 
      [id]:[ 
        ...(this.usersList?.[id]? [...this.usersList[id], from] : [from])
      ]
    }
  }

  unsubscribe(userData) {
    const {chatId, userId} = getIds(userData)
    this.usersList = {
      ...this.usersList,
      [chatId]: this.usersList[chatId].filter(({id}) => id !== userId)
    }
  }

  getUserList() {
    return this.usersList
  }

  getUsersListMassage(userData) {
    const {chatId} = getIds(userData)

    return this.usersList[chatId].map((user) => {
      return`[@${getUserName(user)}](tg://user?id=${user.id})`
    }).join(', ')
  }

  getCallAllUserMessage(userData) {
    return `🚨 ${this.getUsersListMassage(userData)} 🚨`
  }

  isUserExist(userData) {
    const {chatId, userId} = getIds(userData)

    return this.usersList?.[chatId] && this.usersList[chatId].find(({id}) => id === userId)
  }

  isUserListEmpty(userData) {
    const {chatId} = getIds(userData)

    return !this.usersList?.[chatId] || !this.usersList[chatId].length
  }
}

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


bot.launch()