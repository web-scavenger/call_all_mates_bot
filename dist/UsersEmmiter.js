"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersEmmiter = void 0;
const utils_1 = require("./utils");
class UsersEmmiter {
    constructor() {
        this.usersList = {};
    }
    subscribe(userData) {
        const { from, chat: { id } } = userData;
        this.usersList = {
            ...this.usersList,
            [id]: [
                ...(this.usersList?.[id] ? [...this.usersList[id], from] : [from])
            ]
        };
    }
    unsubscribe(userData) {
        const { chatId, userId } = (0, utils_1.getIds)(userData);
        this.usersList = {
            ...this.usersList,
            [chatId]: this.usersList[chatId].filter(({ id }) => id !== userId)
        };
    }
    getUserList() {
        return this.usersList;
    }
    getUsersListMassage(userData) {
        const { chatId } = (0, utils_1.getIds)(userData);
        return this.usersList[chatId].map((user) => {
            return `[@${(0, utils_1.getUserName)(user)}](tg://user?id=${user.id})`;
        }).join(', ');
    }
    getCallAllUserMessage(userData) {
        return `🚨 ${this.getUsersListMassage(userData)} 🚨`;
    }
    isUserExist(userData) {
        const { chatId, userId } = (0, utils_1.getIds)(userData);
        return this.usersList?.[chatId] && this.usersList[chatId].find(({ id }) => id === userId);
    }
    isUserListEmpty(userData) {
        const { chatId } = (0, utils_1.getIds)(userData);
        return !this.usersList?.[chatId] || !this.usersList[chatId].length;
    }
}
exports.UsersEmmiter = UsersEmmiter;
//# sourceMappingURL=UsersEmmiter.js.map