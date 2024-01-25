import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import Logger from "../../../utils/Logger";

export class Validator {
    public static validate(schema: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = schema.validate(req.body);
                if (!error) {
                    next();
                } else {
                    res.status(400).send({ error: `${error.details.at(0)?.path.at(0)} must be set` });
                }
            } catch (error) {
                res.status(500).send({ error: "Internal server error" });
            }
        };
    }
}