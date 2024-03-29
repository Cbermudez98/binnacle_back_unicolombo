import { Response } from "express";
import { IResponseModel } from "../interfaces/IResponseModel";
import { HttpStatusCode } from "../httpStatus/HttpStatus";
import { IRequest } from "../interfaces/IRequest";

export class ResponseModel implements IResponseModel {

    manageResponse(promise: Promise<any>, req: IRequest, res: Response): Promise<void> {
        return promise.then((data) => {
            res.status(200).send({ data });
        }).catch((error) => {
            res.status(error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send({ error: error?.error || "Internal server error" });
        });
    };
}