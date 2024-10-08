import { ClassValidatorFields } from "@/shared/domain/validators/class-validator-fields";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

class StubRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    constructor(data: unknown) {
        Object.assign(this, data);
    }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
    validate(data: StubRules): boolean {
        return super.validate(new StubRules(data));
    }
}

describe("ClassValidatorFields integration tests", () => {
    it("should validate with errors", () => {
        const validator = new StubClassValidatorFields();

        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
            price: [
                "price should not be empty",
                "price must be a number conforming to the specified constraints",
            ],
        });
    });

    it("should validate without errors", () => {
        const validator = new StubClassValidatorFields();
        const dataToValidate = { name: "Wine", price: 127 };

        expect(validator.validate(dataToValidate)).toBeTruthy();
        expect(validator.errors).toBe(null);
        expect(validator.validatedData).toStrictEqual(new StubRules(dataToValidate));
    });
});
