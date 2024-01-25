import { NextFunction, Request, Response } from "express";
import { ParameterStore } from "../../../utils/Constant";
import { IAuth } from "../../shared/interfaces/IAuth";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { HttpStatusCode } from "../../shared/httpStatus/HttpStatus";

export class Auth implements IAuth {
    encode(payload: Record<string, any>): string {
        return sign(payload, ParameterStore.JWT_KEY, {
            expiresIn: "24h"
        });
    }

    validate() {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const authorization = req.headers?.authorization?.split(" ")[1] || "";
                const valid = this.verifyToken(authorization);
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

    verifyToken(token: string): JwtPayload | string {
        return verify(token, ParameterStore.JWT_KEY);
    }
}