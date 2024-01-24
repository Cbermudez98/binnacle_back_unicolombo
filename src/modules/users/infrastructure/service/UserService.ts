import fs from 'fs';
import { IUserCreate, IUser, IUserUpdate, IUserLogin } from '../../domain/IUser.interface';
import { UserRepository } from '../repository/UserRepository';
import { IUserService } from '../../domain/IUserServices';
import { IUserRepository } from '../../domain/IUserRepository';
import { HttpStatusCode } from '../../../shared/httpStatus/HttpStatus';
import { Auth } from "./../../../middleware/Auth"
import { IAuth } from '../../../shared/interfaces/IAuth';
import { EmailTemplate } from '../../../../helper/EmailTemplate';
import { MailBuilder } from '../../../../builder/MailBuilder';
import { ParameterStore } from '../../../../utils/Constant';
import Mailer from '../../../../utils/Mailer';
import Logger from '../../../../utils/Logger';
import path from 'path';
import { isCustomError } from '../../../shared/customError/CustomError';
export class UserService implements IUserService {
    private _userRepository: IUserRepository;
    private _auth: IAuth;
    constructor() {
        this._userRepository = new UserRepository();
        this._auth = new Auth();
    }

    async createUser(user: IUserCreate): Promise<IUser> {
        try {
            const builder = new MailBuilder();
            builder.setTo(user.email);
            builder.setFrom(ParameterStore.EMAIL);
            builder.setSubject("Bienvenido a la bitacora de libros de programacion unicolombo");
            const newUser = await this._userRepository.create(user);
            const jwt = new Auth().encode({ id: newUser.id });
            const url  = `${ParameterStore.URL_FRONT}/auth/${jwt}`;
            const read = fs.readFileSync(path.join(process.cwd(), "src/statics/email-verification.html"), { encoding: "utf-8" });
            const template = EmailTemplate.builder(read, 
                [
                    { name: "%name%", value: `${user.name} ${user.last_name}` },
                    { name: "%url%", value: url }
                ]
            );
            builder.setHtml(template);
            await Mailer.send(builder.build());
            return newUser;
        } catch (error) {
            Logger.fatal(error);
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

            if(!user.auth) {
                throw {
                    error: "Email not validate",
                    status: HttpStatusCode.UNAUTHORIZED
                }
            }
            const token = this._auth.encode({ email: event, iat: Date.now() })
            return { token };
        } catch (error) {
            if(isCustomError(error)) {
                throw {
                    error: error.error,
                    status: error.status
                };
            }
            throw {
                error: "User not found",
                status: HttpStatusCode.NOT_FOUND
            };
        }
    }
}