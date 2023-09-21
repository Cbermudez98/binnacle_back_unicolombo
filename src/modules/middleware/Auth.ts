import { NextFunction, Request, Response } from "express";
import { ParameterStore } from "../../utils/Constant";
import { IAuth } from "../shared/interfaces/IAuth";
import { sign, verify } from "jsonwebtoken";
import { HttpStatusCode } from "../shared/httpStatus/HttpStatus";

export class Auth implements IAuth {
    encode(payload: Record<string, any>): string {
        return sign(payload, ParameterStore.JWT_KEY, {
            expiresIn: "24h"
        });
    }

    decode(req: Request, res: Response, next: NextFunction): void {
        try {
            const authorization = req.headers?.authorization || "";
            const valid = verify(authorization, ParameterStore.JWT_KEY);
            if (valid) {
                next();
            } else {
                throw "Unauthorized";
            }
        } catch (error) {
            res.status(HttpStatusCode.UNAUTHORIZED).send({ error: "Unauthorized" });
        }
    }
}