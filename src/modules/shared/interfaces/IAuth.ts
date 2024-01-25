import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IAuth {
    encode(payload: Record<string, any>): string,
    validate: () => (req: Request, res: Response, next: NextFunction) => void,
    verifyToken: (token: string) => JwtPayload | string;
}