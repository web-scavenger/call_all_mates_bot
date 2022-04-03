import { Message, Update, User } from "typegram";

export type BotMessage = Update.New & Update.NonChannel & Message.TextMessage

export interface UsersList {
  [id: string]: Array<User>
}


export interface Options {
  [opt_name: string]: string | boolean;
}
