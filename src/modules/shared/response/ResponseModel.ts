import { Request, Response } from "express";
import { IResponseModel } from "../interfaces/IResponseModel";

export class ResponseModel implements IResponseModel {

    manageResponse(promise: Promise<any>, req: Request, res: Response): void {
        promise.then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            res.status(500).send({ error: error.message || "Internal server error" });
        });
    };
}