import { IUser, IUserCreate, IUserUpdate } from "./IUser.interface";

export interface IUserRepository {
    create: (user: IUserCreate) => Promise<IUser>,
    get: (id: IUser['id']) => Promise<IUser | null>,
    update: (id: IUser['id'], user: IUserUpdate) => Promise<boolean>,
    getCustomUser: (event: Record<string, any>) => Promise<IUser | null>,
}