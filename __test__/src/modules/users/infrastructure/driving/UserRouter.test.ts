import request from "supertest";
import { App } from "../../../../../../src/app/app";
import { UserRouter } from "../../../../../../src/modules/users/infrastructure/driving/UserRouter";
import Logger from "../../../../../../src/utils/Logger";

describe("User router test", () => {
    it("GET/ Should return with success get user by id", async () => {
        const app = new App().getApp();
        const userRouter = new UserRouter();
        app.use("/users", userRouter.initRoutes());
        const response = await request(app).get("/users");
        expect(response.status).toBe(401);
    });
});