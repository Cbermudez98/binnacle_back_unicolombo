import { Response } from "express";
import { IRequest } from "./IRequest";

export interface IResponseModel {
    manageResponse: (promise: Promise<any>, req: IRequest, res: Response) => Promise<void>;
}