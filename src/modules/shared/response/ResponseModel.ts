import { Request, Response } from "express";
import { IResponseModel } from "../interfaces/IResponseModel";
import { HttpStatusCode } from "../httpStatus/HttpStatus";

export class ResponseModel implements IResponseModel {

    manageResponse(promise: Promise<any>, req: Request, res: Response): void {
        promise.then((data) => {
            res.status(200).send({ data });
        }).catch((error) => {
            res.status(error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send({ error: error?.error || "Internal server error" });
        });
    };
}