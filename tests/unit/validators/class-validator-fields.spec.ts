import { ClassValidatorFields } from "@/shared/domain/validators/class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{ field: string }> {}

describe("ClassValidatorFields unit tests", () => {
    it("should initialize errors and validatedData variables with null", () => {
        const sut = new StubClassValidatorFields();
        expect(sut.errors).toBeNull();
        expect(sut.validatedData).toBeNull();
    });

    it("should validate with errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");

        spyValidateSync.mockReturnValue([
            { property: "field", constraints: { isNotEmpty: "field should not be empty" } },
        ]);

        const sut = new StubClassValidatorFields();

        expect(sut.validate(null)).toBeFalsy();
        expect(sut.validatedData).toBeNull();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.errors).toStrictEqual({ field: ["field should not be empty"] });
    });

    it("should validate without errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");

        spyValidateSync.mockReturnValue([]);

        const sut = new StubClassValidatorFields();

        expect(sut.validate({ field: "value" })).toBeTruthy();
        expect(sut.validatedData).toStrictEqual({ field: "value" });
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.errors).toBe(null);
    });
});
