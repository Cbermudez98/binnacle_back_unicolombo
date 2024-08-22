import { Application } from "express";
import { IRouterManager } from "./shared/interfaces/IRouterManager";
import { UserRouter } from "./users/infrastructure/driving/UserRouter";
import { BinnacleRouter } from "./binnacle/infrastructure/driving/BinnacleRouter";

export class RouterManager implements IRouterManager{
    private _app: Application;
    private _userRouter: UserRouter;
    private _binnacleRouter: BinnacleRouter;
    constructor(app: Application) {
        this._app = app;
        this._userRouter = new UserRouter();
        this._binnacleRouter = new BinnacleRouter();
    }

    manageRoutes(): void {
        this._app.use("/users", this._userRouter.initRoutes());
        this._app.use("/binnacle", this._binnacleRouter.initRoutes());
    }
}