import { Response, Router } from "express";
import { IRouterModule } from "../../../shared/interfaces/IRouterModule";
import { UserUseCase } from "../../application/UserUseCase";
import { UserService } from "../service/UserService";
import { ResponseModel } from "../../../shared/response/ResponseModel";
import { Validator } from "../../../middleware/schemaValidator/Validator";
import { useSchema, userLoginAdminSchema, userLoginSchema, userUpdateSchema } from "../schemas/UserSchema";
import { IAuth } from "../../../shared/interfaces/IAuth";
import { Auth } from "../../../middleware/auth/Auth.middleware";
import { IRequest } from "../../../shared/interfaces/IRequest";
import { IRole } from "../../../shared/interfaces/IRole";
import { Role } from "../../../middleware/role/Role.middleware";
import { ROLE } from "../../../shared/enums/Enum";

export class UserRouter implements IRouterModule {
    private readonly _userRouter: Router;
    private readonly _userUseCase: UserUseCase;
    private readonly _userService: UserService;
    private readonly _responseModel: ResponseModel;
    private readonly _authMiddleware: IAuth;
    private readonly _roleMiddleware: IRole;
    constructor() {
        this._responseModel = new ResponseModel();
        this._userService = new UserService();
        this._authMiddleware = new Auth();
        this._roleMiddleware = new Role();
        this._userUseCase = new UserUseCase({ userService: this._userService }, { authService: this._authMiddleware });
        this._userRouter = Router();
    }
    initRoutes(): Router {
        this._userRouter.get("/",
        this._authMiddleware.validate(),
        this._roleMiddleware.validate([ROLE.STUDENT]),
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
        this._roleMiddleware.validate([ROLE.STUDENT]),
            Validator.validate(userUpdateSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.updateUser(req.user || "",req.body), req, res);
        });

        this._userRouter.post("/login", 
        Validator.validate(userLoginSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.login(req.body), req, res);
            });
        this._userRouter.post("/login/admin", 
        Validator.validate(userLoginAdminSchema),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.login(req.body, true), req, res);
            });
        this._userRouter.get("/verification/:token", (req: IRequest, res: Response) => {
            this._responseModel.manageResponse(this._userUseCase.validate(req.params.token), req, res);
        });
        return this._userRouter;
    };
}