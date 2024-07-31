import { FieldsErrors, ValidatorFieldsInterface } from "./validator-fields.interface";
import { validateSync } from "class-validator";

export abstract class ClassValidatorFields<T> implements ValidatorFieldsInterface<T> {
    errors: FieldsErrors = null;
    validatedData: T = null;

    validate(data: T): boolean {
        const errors = validateSync(data as object);
        if (errors.length) {
            this.errors = {};
            for (const error of errors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints);
            }
        } else {
            this.validatedData = data;
        }

        return !errors.length;
    }
}
