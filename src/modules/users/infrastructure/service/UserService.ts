import { IUserCreate, IUser, IUserUpdate, IUserLogin } from '../../domain/IUser.interface';
import { UserRepository } from '../repository/UserRepository';
import { IUserService } from '../../domain/IUserServices';
import { IUserRepository } from '../../domain/IUserRepository';
import { HttpStatusCode } from '../../../shared/httpStatus/HttpStatus';
import { Auth } from "./../../../middleware/Auth"
import { IAuth } from '../../../shared/interfaces/IAuth';
export class UserService implements IUserService {
    private _userRepository: IUserRepository;
    private _auth: IAuth;
    constructor() {
        this._userRepository = new UserRepository();
        this._auth = new Auth();
    }

    async createUser(user: IUserCreate): Promise<IUser> {
        try {
            return await this._userRepository.create(user);
        } catch (error) {
            throw {
                error: "Error creating user",
                status: HttpStatusCode.CONFLICT
            };
        }
    };

    async getUser(id: number): Promise<IUser> {
        try {
            const user = await this._userRepository.get(id);
            if (!user) {
                throw "User not found";
            }
            const currentUser = { ...user } as any;
            delete currentUser.password;
            return currentUser;
        } catch (error) {
            throw {
                error: "User not found",
                status: HttpStatusCode.NOT_FOUND
            };
        }
    };

    async updateUser(id: number, user: IUserUpdate): Promise<boolean> {
        try {
            const userFound = await this._userRepository.getCustomUser({ id });
            if (!userFound) {
                throw "User not found";
            }
            return await this._userRepository.update(id, user);
        } catch (error) {
            throw { 
                error: "Error updating user",
                status: HttpStatusCode.NOT_MODIFIED
            };
        }
    };

    async login(event: IUserLogin): Promise<{ token: string }> {
        try {
            const user = await this._userRepository.getCustomUser({ email: event.email });
            if (!user) {
                throw "User not found";
            }
            const token = this._auth.encode({ email: event, iat: Date.now() })
            return { token };
        } catch (error) {
            throw {
                error: "User not found",
                status: HttpStatusCode.NOT_FOUND
            };
        }
    }
}