import { getMockReq, getMockRes } from "@jest-mock/express";
import { ResponseModel } from "../../../../../src/modules/shared/response/ResponseModel";

describe("Response model test", () => {
    it("should finish with success", () => {
        const req = getMockReq();
        const { res } = getMockRes();
        const promise = Promise.resolve("data");
        const responseModel = new ResponseModel();
        responseModel.manageResponse(promise, req, res);
        setTimeout(() => {
            expect(res.status).toHaveBeenCalledWith(200);
        }, 1000);
    });

    it("should finish with error", () => {
        const req = getMockReq();
        const { res } = getMockRes();
        const promise = Promise.reject("data");
        const responseModel = new ResponseModel();
        responseModel.manageResponse(promise, req, res);
        setTimeout(() => {
            expect(res.status).toHaveBeenCalledWith(500);
        }, 1000);
    });
});