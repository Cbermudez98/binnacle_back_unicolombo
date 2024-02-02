import { IUserLogin, IUser, IUserCreate, IUserUpdate } from './IUser.interface';

export interface IUserUseCase {
    createUser: (user: IUserCreate) => Promise<IUser>,
    updateUser: (id: IUser['id'], user: IUserUpdate) => Promise<boolean>,
    getUser: (id: IUser['id']) => Promise<IUser>,
    login: (event: IUserLogin, isAdmin: boolean) => Promise<{ token: string }>
    validate: (token: string) => Promise<{ message: string }>;
}