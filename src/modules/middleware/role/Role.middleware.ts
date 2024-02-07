import { Response, NextFunction } from "express";
import { IRequest } from "../../shared/interfaces/IRequest";
import { IRole } from "../../shared/interfaces/IRole";
import { HttpStatusCode } from "../../shared/httpStatus/HttpStatus";

export class Role implements IRole {
    validate(roles: string[]){
        return (req: IRequest, res: Response<any, Record<string, any>>, next: NextFunction): void => {
            try {
                if (!req.role) throw new Error("Role not valid");
                const roleFound = roles.find((role: string) => role === req.role);
                if(!roleFound) throw new Error("Role not authorized");
                next();
            } catch (error) {
                res.status(HttpStatusCode.UNAUTHORIZED).send({
                    error: "Not authorized"
                });
            }
        };
    } 
}