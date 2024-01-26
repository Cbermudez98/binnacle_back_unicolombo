import { IUser, IUserCreate } from "../../../../../../src/modules/users/domain/IUser.interface";
import { UserRepository } from "../../../../../../src/modules/users/infrastructure/repository/UserRepository";

describe("User repository test", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Should create a user", async () => {
        const userRepository = new UserRepository();
        const user = {
            "name": "c",
            "last_name": "c",
            "email": "c@c",
            "password": "c*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(userRepository["_userRepository"], "save");
        repository.mockResolvedValue({ ...user } as any);

        const createdUser = await userRepository.create(user);
        expect(createdUser).toBeDefined();
    });

    it("Should fail create a user", async () => {
        const userRepository = new UserRepository();
        const user = {
            "name": "c",
            "last_name": "c",
            "email": "c@c",
            "password": "c*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(userRepository["_userRepository"], "save");
        repository.mockRejectedValue({});

        try {
            await userRepository.create(user);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should get a user", async () => {
        const userRepository = new UserRepository();
        const user = {
            "name": "c",
            "last_name": "c",
            "email": "c@c",
            "password": "c*",
            "phone_number": "300123456578",
            "student_id": "2110885008",
            "document_number": "123123123123"
        };

        const repository = jest.spyOn(userRepository["_userRepository"], "findOne");
        repository.mockResolvedValue({ ...user } as any);

        const createdUser = await userRepository.get(1);
        expect(createdUser).toBeDefined();
    });

    it("Should fail getting a user", async () => {
        const userRepository = new UserRepository();

        const repository = jest.spyOn(userRepository["_userRepository"], "findOne");
        repository.mockRejectedValue({});

        try {
            await userRepository.get(1);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should update a user", async () => {
        const userRepository = new UserRepository();
        const user = {
            "name": "c",
            "last_name": "c",
            "email": "c@c"
        };

        const repository = jest.spyOn(userRepository["_userRepository"], "update");
        repository.mockResolvedValue({ ...user } as any);

        const createdUser = await userRepository.update(1, user);
        expect(createdUser).toBeDefined();
    });

    it("Should fail updating a user", async () => {
        const userRepository = new UserRepository();

        const repository = jest.spyOn(userRepository["_userRepository"], "update");
        repository.mockRejectedValue({});

        try {
            await userRepository.update(1, {});
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it("Should get a user customer where", async () => {
        const userRepository = new UserRepository();
        const user = {
            "name": "c",
            "last_name": "c",
            "email": "c@c"
        };

        const repository = jest.spyOn(userRepository["_userRepository"], "findOne");
        repository.mockResolvedValue({ ...user } as any);

        const createdUser = await userRepository.getCustomUser(user);
        expect(createdUser).toBeDefined();
    });

    it("Should fail getting a user customer where", async () => {
        const userRepository = new UserRepository();

        const repository = jest.spyOn(userRepository["_userRepository"], "findOne");
        repository.mockRejectedValue({});

        try {
            await userRepository.getCustomUser({});
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});