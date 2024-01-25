import { NextFunction, Request, Response } from "express";
import { getMockReq, getMockRes } from '@jest-mock/express'
import jwt from "jsonwebtoken";
import { Auth } from "../../../../../src/modules/middleware/auth/Auth";

describe("Auth test", () => {
    it("Should encode with success", () => {
        const auth = new Auth();
        const decode = auth.encode({ message: "encoded" });
        expect(decode).toBeTruthy();
    });

    it("Should decode with success", () => {
        const auth = new Auth();
        const verity = jest.spyOn(jwt, "verify");
        verity.mockImplementation((token: string) => ({ message: true }));
        const req = getMockReq({ headers: { authorization: "Bearer 123" } });
        const { res, next } = getMockRes();
        auth.validate()(req, res, next);
        expect(next).toHaveBeenCalled();
        jest.clearAllMocks();
    });

    it("Should decode with success", () => {
        const auth = new Auth();
        const verity = jest.spyOn(jwt, "verify");
        const req = getMockReq({ headers: { authorization: "Bearer 123" } });
        const { res, next } = getMockRes();
        verity.mockImplementation((token: string) => undefined);
        auth.validate()(req, res, next);
        expect(next).not.toHaveBeenCalled();
        jest.clearAllMocks();
    });
});