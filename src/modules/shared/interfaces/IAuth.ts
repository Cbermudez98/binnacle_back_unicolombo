import { NextFunction, Request, Response } from "express";

export interface IAuth {
    encode(payload: Record<string, any>): string,
    decode: (req: Request, res: Response, next: NextFunction) => void,
}