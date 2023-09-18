import { Request, Response } from "express";

export interface IResponseModel {
    manageResponse: (promise: Promise<any>, req: Request, res: Response) => void;
}