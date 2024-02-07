import { NextFunction, Response } from "express";
import { IRequest } from "./IRequest";

export interface IRole {
    validate: (roles: string[]) => (req: IRequest, res: Response, next: NextFunction) => void,
}