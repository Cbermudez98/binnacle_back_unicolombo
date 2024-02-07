import { IUser, IUserLogin, IUserUpdate } from './IUser.interface';
import { IUserCreate } from "./IUser.interface";

export interface IUserService {
    createUser: (user: IUserCreate) => Promise<IUser>,
    getUser: (id: IUser['id']) => Promise<IUser>
    updateUser: (id: IUser['id'], user: IUserUpdate) => Promise<boolean>,
    login: (event: IUserLogin) => Promise<{ token: string }>,
    loginAdmin: (event: IUserLogin) => Promise<{ token: string }>,
}