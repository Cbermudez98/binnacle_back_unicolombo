import { Application } from "express";
import { IRouterManager } from "./shared/interfaces/IRouterManager";
import { UserRouter } from "./users/infrastructure/driving/UserRouter";

export class RouterManager implements IRouterManager{
    private _app: Application;
    private _userRouter: UserRouter;
    constructor(app: Application) {
        this._app = app;
        this._userRouter = new UserRouter();
    }

    manageRoutes(): void {
        this._app.use("/users", this._userRouter.initRoutes());
    }
}