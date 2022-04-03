import { Options } from "./types"
import { getHelpKeyboard } from "./utils";

export const CALL_ALL_USER_OPTIONS: Options = {
  parse_mode: 'Markdown',
  disable_notification: false
}

export const COMMANDS_LIST: Record<string, string> = {
  subscribe : 'subscribe',
  unsubscribe: 'unsubscribe',
  call: 'here',
  help: 'help',
  quit: 'quit'
}

const keyboard = getHelpKeyboard()

export const HELP_COMMAND_OPTIONS: Options = {
  reply_markup: JSON.stringify({ 
      keyboard,
      one_time_keyboard: true,
      resize_keyboard: true,
      force_reply: false
  }),
};

export const MESSAGES: Record<string, string> = {
  exist: 'Sorry, but you are already in the list 🤨',
  add: 'User added 🤪',
  remove: 'User removed 🥲',
  emptyList: 'There is no users, yet 🧐',
  error: 'Oops... Something went wrong 🤬',
  start: '👋 Hello, this is bot for tagging chat mates. To see the command list send /help'
}