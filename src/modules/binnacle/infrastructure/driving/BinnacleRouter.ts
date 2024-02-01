import { Router, Response } from "express";
import { IRouterModule } from "../../../shared/interfaces/IRouterModule";
import { IBinnacleUseCase } from "../../domain/IBinnacleUseCase";
import { BinnacleUseCase } from "../../application/BinnacleUseCase";
import { IBinnacleService } from "../../domain/IBinnacleService";
import { BinnacleService } from "../service/BinnacleService";
import { IBinnacleRepository } from "../../domain/IBinnacleRepository";
import { IBookViewRepository } from "../../domain/IBookViewRepository";
import { BinnacleRepository } from "../repository/BinnacleRepository";
import { BookViewRepository } from "../repository/BookViewRepository";
import { IAuth } from "../../../shared/interfaces/IAuth";
import { Auth } from "../../../middleware/auth/Auth";
import { IRequest } from "../../../shared/interfaces/IRequest";
import { ResponseModel } from "../../../shared/response/ResponseModel";
import { Validator } from "../../../middleware/schemaValidator/Validator";
import { bookCreate, bookUpdate } from "../schemas/BinnacleSchema";

export class BinnacleRouter implements IRouterModule {
    private readonly _binnacleUseCase: IBinnacleUseCase;
    private readonly _binnacleService: IBinnacleService;
    private readonly _binnacleRepository: IBinnacleRepository;
    private readonly _bookViewRepository: IBookViewRepository;
    private readonly _authMiddleware: IAuth;
    private readonly _binnacleRouter: Router;
    private readonly _responseModel: ResponseModel;

    constructor() {
        this._binnacleRepository = new BinnacleRepository();
        this._bookViewRepository = new BookViewRepository();
        this._binnacleService = new BinnacleService(this._binnacleRepository, this._bookViewRepository);
        this._binnacleUseCase = new BinnacleUseCase(this._binnacleService);
        this._authMiddleware = new Auth();
        this._binnacleRouter = Router();
        this._responseModel = new ResponseModel();
    }
    initRoutes(): Router {
        this._binnacleRouter.get("/",
            this._authMiddleware.validate(),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._binnacleUseCase.getBooks(), req, res);
            });
        this._binnacleRouter.get("/:id", 
        this._authMiddleware.validate(),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._binnacleUseCase.getBook(req.params.id, Number(req.user)), req, res);
            });
        this._binnacleRouter.post("/",
            this._authMiddleware.validate(),
            Validator.validate(bookCreate),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._binnacleUseCase.addBook(req.body), req, res);
            });
        this._binnacleRouter.patch("/:id",
            this._authMiddleware.validate(),
            Validator.validate(bookUpdate),
            (req: IRequest, res: Response) => {
                this._responseModel.manageResponse(this._binnacleUseCase.updateBook(req.params.id, req.body), req, res);
            });
        return this._binnacleRouter;
    }
}