import { isCustomError } from "../../../../../src/modules/shared/customError/CustomError";

describe("Custom error test", () => {
    it("should return and instance of CustomError", () => {
        const customError = isCustomError({ error: "error", "status": 200 });
        expect(customError).toBeTruthy();
    });
});