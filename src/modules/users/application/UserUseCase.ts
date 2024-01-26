import { IUserCreate, IUser, IUserUpdate, IUserLogin } from "../domain/IUser.interface";
import { IUserUseCase } from "../domain/IUserUseCase";
import { IUserService } from "../domain/IUserServices";
import { IAuth } from "../../shared/interfaces/IAuth";

export class UserUseCase implements IUserUseCase {
    private _userService: IUserService;
    private _authService: IAuth;
    constructor({ userService }: { userService: IUserService }, { authService }: { authService: IAuth }) {
        this._userService = userService;
        this._authService = authService;
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

    async validate(token: string): Promise<{ message: string }> {
        try {
            const decodedToken = this._authService.verifyToken(token);
            await this._userService.updateUser(decodedToken.id, { auth: true });
            return { message: "Validated" };
        } catch (error) {
            throw error;
        }
    }
}