"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.HELP_COMMAND_OPTIONS = exports.COMMANDS_LIST = exports.CALL_ALL_USER_OPTIONS = void 0;
const utils_1 = require("./utils");
exports.CALL_ALL_USER_OPTIONS = {
    parse_mode: 'Markdown',
    disable_notification: false
};
exports.COMMANDS_LIST = {
    subscribe: 'subscribe',
    unsubscribe: 'unsubscribe',
    call: 'here',
    help: 'help',
    quit: 'quit'
};
const keyboard = (0, utils_1.getHelpKeyboard)();
exports.HELP_COMMAND_OPTIONS = {
    reply_markup: JSON.stringify({
        keyboard,
        one_time_keyboard: true,
        resize_keyboard: true,
        force_reply: false
    }),
};
exports.MESSAGES = {
    exist: 'Sorry, but you are already in the list 🤨',
    add: 'User added 🤪',
    remove: 'User removed 🥲',
    emptyList: 'There is no users, yet 🧐',
    error: 'Oops... Something went wrong 🤬',
    start: '👋 Hello, this is bot for tagging chat mates. To see the command list send /help'
};
//# sourceMappingURL=constants.js.map