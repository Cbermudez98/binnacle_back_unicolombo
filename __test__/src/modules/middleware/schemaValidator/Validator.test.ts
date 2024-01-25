import joi from 'joi';
import { Validator } from '../../../../../src/modules/middleware/schemaValidator/Validator';
import { getMockReq, getMockRes } from '@jest-mock/express';
describe("schema validator test", () => {
    it("Should validate schema with success", () => {
        const schema = joi.object({
            name: joi.string().required()
        });

        const req = getMockReq({ body: { name: "test" } });
        const { res, next } = getMockRes();
        Validator.validate(schema)(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("Should validate schema with error", () => {
        const schema = joi.object({
            name: joi.string().required()
        });

        const req = getMockReq();
        const { res, next } = getMockRes();
        Validator.validate(schema)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("Should validate schema throw error", () => {
        const schema = joi.object({
            name: joi.string().required()
        });

        const req = getMockReq();
        const { res, next } = getMockRes();
        jest.spyOn(schema, "validate").mockImplementation((value: any) => {
            throw new Error();
        });
        Validator.validate(schema)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});