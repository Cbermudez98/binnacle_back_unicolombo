import { IUser, IUserUpdate } from './../../domain/IUser.interface';
import { IUserCreate } from "../../domain/IUser.interface";

export interface IUserService {
    createUser: (user: IUserCreate) => Promise<IUser>,
    getUser: (id: IUser['id']) => Promise<IUser>
    updateUser: (id: IUser['id'], user: IUserUpdate) => Promise<boolean>
}