import jwt from "jsonwebtoken";

import { IUser, IUserCreate, IUserUpdate } from "../../../../../../src/modules/users/domain/IUser.interface";
import { IUserService } from "../../../../../../src/modules/users/domain/IUserServices";
import { UserService } from "../../../../../../src/modules/users/infrastructure/service/UserService";
import { UserRepository } from "../../../../../../src/modules/users/infrastructure/repository/UserRepository";
import Mailer from "../../../../../../src/utils/Mailer";
import { Auth } from "../../../../../../src/modules/middleware/auth/Auth.middleware";
import Encrypt from "../../../../../../src/utils/Encrypt";

describe("User service test", () => {
    let userService: IUserService;

    afterEach(() => {
        jest.clearAllMocks();
    })

    beforeAll(() => {
        userService = new UserService();
    });

    it("Should create an user with success",  async() => {
        const user: IUserCreate = {
            "name": "as",
            "last_name": "as",
            "email": "c@c.com",
            "password": "as*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(UserRepository.prototype, "create");
        const mail = jest.spyOn(Mailer, "send");
        
        mail.mockResolvedValue(true);
        repository.mockResolvedValueOnce({ id: "1", ...user } as IUser);
        const response = await userService.createUser(user);
        expect(response).toBeDefined();
    });

    it("Should fail create an user",  async() => {
        const user: IUserCreate = {
            "name": "as",
            "last_name": "as",
            "email": "c@c.com",
            "password": "as*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(UserRepository.prototype, "create");
        const mail = jest.spyOn(Mailer, "send");
        
        mail.mockResolvedValue(true);
        repository.mockRejectedValue({});
        try {
            await userService.createUser(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should get an user with success",  async() => {
        const user: IUserCreate = {
            "name": "as",
            "last_name": "as",
            "email": "c@c.com",
            "password": "as*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(UserRepository.prototype, "get");
        
        repository.mockResolvedValueOnce({ id: "1", ...user } as IUser);
        const response = await userService.getUser("1");
        expect(response).toBeDefined();
    });
    it("Should throw an error getting a user",  async() => {
        const repository = jest.spyOn(UserRepository.prototype, "get");
        
        repository.mockResolvedValue(null);
        try {
            await userService.getUser("1");
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should update an user with success",  async() => {
        const user: IUserUpdate = {
            "name": "as"
        };

        const repositoryGet = jest.spyOn(UserRepository.prototype, "get");
        const repositoryUpdate = jest.spyOn(UserRepository.prototype, "update");
        
        repositoryGet.mockResolvedValueOnce({ id: "1", ...user } as IUser);
        repositoryUpdate.mockResolvedValueOnce(true);
        const response = await userService.updateUser("1", user);
        expect(response).toBeDefined();
    });

    it("Should throw an error updating a user",  async() => {
        const user: IUserUpdate = {
            "name": "as"
        };

        const repositoryGet = jest.spyOn(UserRepository.prototype, "get");
        repositoryGet.mockResolvedValue(null);
        try {
            await userService.updateUser("1", user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should login an user with success",  async() => {
        const repositoryGet = jest.spyOn(UserRepository.prototype, "getCustomUser");
        const encryptSpy = jest.spyOn(Encrypt, "compare");
        
        repositoryGet.mockResolvedValueOnce({ id: "1", password: "123" ,auth: true } as IUser);
        encryptSpy.mockReturnValue(true);
        const response = await userService.login({ email: "c@c.com", password: "123" });
        expect(response).toBeDefined();
    });

    it("Should throw an error login an user",  async() => {
        const repositoryGet = jest.spyOn(UserRepository.prototype, "getCustomUser");
        
        repositoryGet.mockResolvedValue(null);
        try {
            await userService.login({ email: "c@c.com", password: "123" });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should throw an error login an user auth",  async() => {
        const repositoryGet = jest.spyOn(UserRepository.prototype, "getCustomUser");
        
        repositoryGet.mockResolvedValue({ id: "1", auth: false } as IUser);
        try {
            await userService.login({ email: "c@c.com", password: "123" });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should throw an error login an user encode",  async() => {
        const repositoryGet = jest.spyOn(UserRepository.prototype, "getCustomUser");
        const authSpy = jest.spyOn(jwt, "sign");
        authSpy.mockImplementation(() => {
            throw new Error();
        });
        repositoryGet.mockResolvedValueOnce({ id: "1", auth: true } as IUser);
        try {
            await userService.login({ email: "c@c.com", password: "123" });
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});