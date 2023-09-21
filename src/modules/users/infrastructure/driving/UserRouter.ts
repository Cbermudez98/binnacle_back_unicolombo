import { Request, Response, Router } from "express";
import { IRouterModule } from "../../../shared/interfaces/IRouterModule";
import { UserUseCase } from "../../application/UserUseCase";
import { UserService } from "../service/UserService";
import { ResponseModel } from "../../../shared/response/ResponseModel";
import { Validator } from "../../../shared/schemaValidator/Validator";
import { useSchema, userLoginSchema, userUpdateSchema } from "../schemas/UserSchema";

export class UserRouter implements IRouterModule{
    private readonly _userRouter: Router;
    private readonly _userUseCase: UserUseCase;
    private readonly _userService: UserService;
    private readonly _responseModel: ResponseModel;
    constructor() {
        this._responseModel = new ResponseModel();
        this._userService = new UserService();
        this._userUseCase = new UserUseCase({ userService: this._userService });
        this._userRouter = Router();
    }
    initRoutes(): Router {
        this._userRouter.get("/:id",
            (req: Request, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.getUser(Number(req.params.id)), req, res);
        });

        this._userRouter.post("/",
            Validator.validate(useSchema),
            (req: Request, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.createUser(req.body), req, res);
        });

        this._userRouter.patch("/:id",
            Validator.validate(userUpdateSchema),
            (req: Request, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.updateUser(Number(req.params.id),req.body), req, res);
        });

        this._userRouter.post("/login", 
        Validator.validate(userLoginSchema),
            (req: Request, res: Response) => {
                this._responseModel.manageResponse(this._userUseCase.login(req.body), req, res);
            });
        return this._userRouter;
    };
}