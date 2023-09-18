import { IUser, IUserCreate, IUserUpdate } from './IUser.interface';

export interface IUserUseCase {
    createUser: (user: IUserCreate) => Promise<IUser>,
    updateUser: (id: IUser['id'], user: IUserUpdate) => Promise<boolean>,
    getUser: (id: IUser['id']) => Promise<IUser>
}