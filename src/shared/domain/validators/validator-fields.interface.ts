export type FieldsErrors = {
    [field: string]: string[];
};

export interface ValidatorFieldsInterface<T, D> {
    errors: FieldsErrors;
    validatedData: T;
    validate: (data: D) => boolean;
}
