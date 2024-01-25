import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IRequest } from "./IRequest";

export interface IAuth {
    encode(payload: Record<string, any>): string,
    validate: () => (req: IRequest, res: Response, next: NextFunction) => void,
    verifyToken: (token: string) => JwtPayload;
}