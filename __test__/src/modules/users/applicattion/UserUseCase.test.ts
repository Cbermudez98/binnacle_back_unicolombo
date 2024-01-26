import { JwtPayload } from "jsonwebtoken";
import { IAuth } from "../../../../../src/modules/shared/interfaces/IAuth";
import { UserUseCase } from "../../../../../src/modules/users/application/UserUseCase";
import { IUser, IUserCreate } from "../../../../../src/modules/users/domain/IUser.interface";
import { IUserService } from "../../../../../src/modules/users/domain/IUserServices";

describe("User use case test", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockSuccess: IUserService = {
        createUser: () => Promise.resolve({} as IUser),
        getUser: () => Promise.resolve({} as IUser),
        login: () => Promise.resolve({ token: "123123" }),
        updateUser: () => Promise.resolve(true)
    };

    const authMock: IAuth = {
        verifyToken: () => ({ id: 1 } as JwtPayload),
        encode: jest.fn(),
        validate: jest.fn()
    };

    const authMockFail: IAuth = {
        verifyToken: () => {
            throw new Error();
        },
        encode: () => {
            throw new Error();
        },
        validate: () => {
            throw new Error()
        }
    };

    const mockFail: IUserService = {
        createUser: () => {
            throw new Error()
        },
        getUser: () => {
            throw new Error()
        },
        login: () => {
            throw new Error()
        },
        updateUser: () => {
            throw new Error()
        },
    };

    it("Should create a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockSuccess }, { authService: authMock});
        const response = await useCase.createUser(user);
        expect(response).toBeDefined();
    });

    it("Should update a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockSuccess }, { authService: authMock});
        const response = await useCase.updateUser(1, user);
        expect(response).toBeDefined();
    });

    it("Should get a user successfully", async () => {
        const useCase = new UserUseCase({ userService: mockSuccess }, { authService: authMock});
        const response = await useCase.getUser(1);
        expect(response).toBeDefined();
    });

    it("Should login a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockSuccess }, { authService: authMock});
        const response = await useCase.login(user);
        expect(response).toBeDefined();
    });

    it("Should validate a user successfully", async () => {
        const useCase = new UserUseCase({ userService: mockSuccess }, { authService: authMock});
        const response = await useCase.validate("");
        expect(response).toBeDefined();
    });

    it("Should fail create a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockFail }, { authService: authMockFail});
        try {
            await useCase.createUser(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should fail update a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockFail }, { authService: authMockFail});
        try {
            await useCase.updateUser(1, user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should fail get a user successfully", async () => {
        const useCase = new UserUseCase({ userService: mockFail }, { authService: authMockFail});
        try {
            await useCase.getUser(1);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should fail login a user successfully", async () => {
        const user = {} as IUserCreate;
        const useCase = new UserUseCase({ userService: mockFail }, { authService: authMockFail});
        try {
            await useCase.login(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should fail validate a user successfully", async () => {
        const useCase = new UserUseCase({ userService: mockFail }, { authService: authMockFail});
        try {
            await useCase.validate("");
            
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});