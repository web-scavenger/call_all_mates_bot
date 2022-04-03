import { BotMessage, UsersList } from "./types";
import { getIds, getUserName } from "./utils";

export class UsersEmmiter {
  usersList: UsersList

  constructor() {
    this.usersList = {};
  }

  subscribe(userData: BotMessage) {
    const {from, chat: {id}} = userData

    this.usersList = {
      ...this.usersList, 
      [id]:[ 
        ...(this.usersList?.[id]? [...this.usersList[id], from] : [from])
      ]
    }
  }

  unsubscribe(userData: BotMessage) {
    const {chatId, userId} = getIds(userData)
    this.usersList = {
      ...this.usersList,
      [chatId]: this.usersList[chatId].filter(({id}) => id !== userId)
    }
  }

  getUserList(): UsersList {
    return this.usersList
  }

  getUsersListMassage(userData: BotMessage) {
    const {chatId} = getIds(userData)

    return this.usersList[chatId].map((user) => {
      return`[@${getUserName(user)}](tg://user?id=${user.id})`
    }).join(', ')
  }

  getCallAllUserMessage(userData: BotMessage) {
    return `🚨 ${this.getUsersListMassage(userData)} 🚨`
  }

  isUserExist(userData: BotMessage) {
    const {chatId, userId} = getIds(userData)

    return this.usersList?.[chatId] && this.usersList[chatId].find(({id}) => id === userId)
  }

  isUserListEmpty(userData: BotMessage) {
    const {chatId} = getIds(userData)

    return !this.usersList?.[chatId] || !this.usersList[chatId].length
  }
}