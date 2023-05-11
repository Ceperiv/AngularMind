import {IUser} from "./user.interface";

export interface ITokens {
  access_token: string,
  refresh_token: string,
  user: IUser,
}
