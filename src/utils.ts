import { User } from "typegram";
import { COMMANDS_LIST } from "./constants";
import { BotMessage } from "./types";

export const getUserName = (userData: User) => {
  return userData.username || userData.first_name || 'anonymous'
}

export const getHelpKeyboard = () => {
  return Object.values(COMMANDS_LIST).reduce((acc, value, index) => {
      const column = index % 2;
      const keyValue = `/${value}`
      acc[column].push(keyValue)
    return acc
  }, [[], []] as Array<Array<string>>)
}

export const getIds = (userData: BotMessage) => {
  const {from, chat: {id: chatId} } = userData
  const userId = from?.id
  return {
    userId,
    chatId
  }
}


