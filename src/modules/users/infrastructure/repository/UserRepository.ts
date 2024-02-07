import { IUser, IUserUpdate } from './../../domain/IUser.interface';
import { DataSource, Repository } from "typeorm";
import { IUserCreate } from "../../domain/IUser.interface";
import { User } from "../entity/User.entity";
import { appDataSource } from "../../../../config/typeorm";
import { IUserRepository } from '../../domain/IUserRepository';

export class UserRepository implements IUserRepository {
    private _dataSource: DataSource = appDataSource;
    private _userRepository: Repository<User>;
    constructor() {
        this._userRepository = this._dataSource.getRepository(User);
    }

    create(user: IUserCreate): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this._userRepository.save(user)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }

    get(id: string): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            this._userRepository.findOne({ where: { id } })
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }

    update(id: string, user: IUserUpdate): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._userRepository.update({ id }, user)
                .then(({ affected }) => resolve(Boolean(affected)))
                .catch((error) => reject(error));
        });
    }

    getCustomUser(event: Record<string, any>): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            this._userRepository.findOne({ where: { ...event } })
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
}