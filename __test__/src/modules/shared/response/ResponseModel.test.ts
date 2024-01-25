import { getMockReq, getMockRes } from "@jest-mock/express";
import { ResponseModel } from "../../../../../src/modules/shared/response/ResponseModel";

describe("Response model test", () => {
    it("should finish with success", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
        const promise = Promise.resolve("data");
        const responseModel = new ResponseModel();
        await responseModel.manageResponse(promise, req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should finish with error", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
        const promise = Promise.reject("data");
        const responseModel = new ResponseModel();
        await responseModel.manageResponse(promise, req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});