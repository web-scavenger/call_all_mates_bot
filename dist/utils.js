"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIds = exports.getHelpKeyboard = exports.getUserName = void 0;
const constants_1 = require("./constants");
const getUserName = (userData) => {
    return userData.username || userData.first_name || 'anonymous';
};
exports.getUserName = getUserName;
const getHelpKeyboard = () => {
    return Object.values(constants_1.COMMANDS_LIST).reduce((acc, value, index) => {
        const column = index % 2;
        const keyValue = `/${value}`;
        acc[column].push(keyValue);
        return acc;
    }, [[], []]);
};
exports.getHelpKeyboard = getHelpKeyboard;
const getIds = (userData) => {
    const { from, chat: { id: chatId } } = userData;
    const userId = from?.id;
    return {
        userId,
        chatId
    };
};
exports.getIds = getIds;
//# sourceMappingURL=utils.js.map