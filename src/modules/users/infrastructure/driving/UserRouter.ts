import { Response, Router } from "express";
import { IRouterModule } from "../../../shared/interfaces/IRouterModule";
import { UserUseCase } from "../../application/UserUseCase";
import { UserService } from "../service/UserService";
import { ResponseModel } from "../../../shared/response/ResponseModel";
import { Validator } from "../../../middleware/schemaValidator/Validator";
import { useSchema, userLoginSchema, userUpdateSchema } from "../schemas/UserSchema";
import { IAuth } from "../../../shared/interfaces/IAuth";
import { Auth } from "../../../middleware/auth/Auth";
import { IRequest } from "../../../shared/interfaces/IRequest";

export class UserRouter implements IRouterModule {
    private readonly _userRouter: Router;
    private readonly _userUseCase: UserUseCase;
    private readonly _userService: UserService;
    private readonly _responseModel: ResponseModel;
    private readonly _authMiddleware: IAuth;
    constructor() {
        this._responseModel = new ResponseModel();
        this._userService = new UserService();
        this._authMiddleware = new Auth();
        this._userUseCase = new UserUseCase({ userService: this._userService }, { authService: this._authMiddleware });
        this._userRouter = Router();
    }
    initRoutes(): Router {
        this._userRouter.get("/",
        this._authMiddleware.validate(),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.getUser(req.user || ""), req, res);
        });

        this._userRouter.post("/",
            Validator.validate(useSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.createUser(req.body), req, res);
        });

        this._userRouter.patch("/",
        this._authMiddleware.validate(),
            Validator.validate(userUpdateSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.updateUser(req.user || "",req.body), req, res);
        });

        this._userRouter.post("/login", 
        Validator.validate(userLoginSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.login(req.body), req, res);
            });
        this._userRouter.get("/verification/:token", (req: IRequest, res: Response) => {
            this._responseModel.manageResponse(this._userUseCase.validate(req.params.token), req, res);
        });
        return this._userRouter;
    };
}