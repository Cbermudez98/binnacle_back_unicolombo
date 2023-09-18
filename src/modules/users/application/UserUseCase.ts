import { IUserCreate, IUser, IUserUpdate } from "../domain/IUser.interface";
import { IUserUseCase } from "../domain/IUserUseCase";
import { IUserService } from "../infrastructure/interfaces/IUserServices";

export class UserUseCase implements IUserUseCase{
    private _userService: IUserService;
    constructor({ userService }: { userService: IUserService }) {
        this._userService = userService;
    }

    async createUser(user: IUserCreate): Promise<IUser> {
        try {
            return await this._userService.createUser(user);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: number, user: IUserUpdate): Promise<boolean> {
        try {
            return await this._userService.updateUser(id, user);
        } catch (error) {
            throw error;
        }
    }

    async getUser(id: number): Promise<IUser> {
        try {
            return await this._userService.getUser(id);
        } catch (error) {
            throw error;
        }
    }
}