import { IUserCreate, IUser, IUserUpdate } from '../../domain/IUser.interface';
import { UserRepository } from '../repository/UserRepository';
import { IUserService } from './../interfaces/IUserServices';
export class UserService implements IUserService {
    private _userRepository: UserRepository;
    constructor() {
        this._userRepository = new UserRepository();
    }

    async createUser(user: IUserCreate): Promise<IUser> {
        try {
            return await this._userRepository.create(user);
        } catch (error) {
            throw error;
        }
    };

    async getUser(id: number): Promise<IUser> {
        try {
            const user = await this._userRepository.get(id);
            if (!user) {
                throw "User not found";
            }
            return user;
        } catch (error) {
            throw error;
        }
    };

    async updateUser(id: number, user: IUserUpdate): Promise<boolean> {
        try {
            return await this._userRepository.update(id, user);
        } catch (error) {
            throw error;
        }
    };
}