import { IUserCreate, IUser, IUserUpdate, IUserLogin } from "../domain/IUser.interface";
import { IUserUseCase } from "../domain/IUserUseCase";
import { IUserService } from "../domain/IUserServices";

export class UserUseCase implements IUserUseCase {
    private _userService: IUserService;
    constructor({ userService }: { userService: IUserService }) {
        this._userService = userService;
    }

    async createUser(user: IUserCreate): Promise<IUser> {
        try {
            const newUser = await this._userService.createUser(user);
            const userN = { ...newUser } as any;
            delete userN.password;
            return userN;
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

    async login(event: IUserLogin): Promise<{ token: string }> {
        try {
            return await this._userService.login(event);
        } catch (error) {
            throw error;
        }
    };
}