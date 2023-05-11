import {IRole} from "./role.interface";

export interface IUser {
  name: string,
  createdAt: string,
  email: string,
  my_role: IRole,
  updatedAt: string,
  _id: string,
}
