import {
    UserRules,
    UserValidator,
    UserValidatorFactory,
} from "@/user/domain/validators/user.validator";
import { userDataBuilder } from "../../helpers/user-data-builder";

let sut: UserValidator;
describe("UserValidator unit tests", () => {
    beforeEach(() => {
        sut = UserValidatorFactory.create();
    });

    describe("name field validation", () => {
        it("Should return all name errors", () => {
            const isValid = sut.validate(null as any);
            expect(isValid).toBeFalsy();
            expect(sut.errors.name).toStrictEqual([
                "name should not be empty",
                "name must be shorter than or equal to 255 characters",
                "name must be a string",
            ]);
        });

        it("Should return error if name is empty string", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), name: "" });
            expect(isValid).toBeFalsy();
            expect(sut.errors.name).toStrictEqual(["name should not be empty"]);
        });

        it("Should return error if name is not string", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), name: 123 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors.name).toStrictEqual([
                "name must be shorter than or equal to 255 characters",
                "name must be a string",
            ]);
        });

        it("Should return error if name has more than 255 chard", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), name: "*".repeat(256) });
            expect(isValid).toBeFalsy();
            expect(sut.errors.name).toStrictEqual([
                "name must be shorter than or equal to 255 characters",
            ]);
        });

        it("Should return true if name is valid", () => {
            const props = userDataBuilder({});
            const isValid = sut.validate(props);
            expect(isValid).toBeTruthy();
            expect(sut.errors?.name).toBe(undefined);
            expect(sut.validatedData).toStrictEqual(new UserRules(props));
        });
    });

    describe("email field validation", () => {
        it("Should return error if email is empty", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), email: "" });
            expect(isValid).toBeFalsy();
            expect(sut.errors.email).toStrictEqual([
                "email should not be empty",
                "email must be an email",
            ]);
        });

        it("Should return error if email is not a string", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), email: 123 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors.email).toStrictEqual([
                "email must be an email",
                "email must be shorter than or equal to 255 characters",
                "email must be a string",
            ]);
        });

        it("Should return error if email is not a valid email", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), email: "invalid_email" });
            expect(isValid).toBeFalsy();
            expect(sut.errors.email).toStrictEqual(["email must be an email"]);
        });

        it("Should return error if email has more than 255 characters", () => {
            const isValid = sut.validate({
                ...userDataBuilder({}),
                email: `${"a".repeat(256)}@google.com`,
            });
            expect(isValid).toBeFalsy();
            expect(sut.errors.email).toStrictEqual([
                "email must be an email",
                "email must be shorter than or equal to 255 characters",
            ]);
        });

        it("Should return true if email is valid", () => {
            const props = userDataBuilder({ email: "valid@example.com" });
            const isValid = sut.validate(props);
            expect(isValid).toBeTruthy();
            expect(sut.errors?.email).toBe(undefined);
            expect(sut.validatedData).toStrictEqual(new UserRules(props));
        });
    });

    describe("password field validation", () => {
        it("Should return error if password is empty", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), password: "" });
            expect(isValid).toBeFalsy();
            expect(sut.errors.password).toStrictEqual(["password should not be empty"]);
        });

        it("Should return error if password is not a string", () => {
            const isValid = sut.validate({ ...userDataBuilder({}), password: 123 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors.password).toStrictEqual([
                "password must be shorter than or equal to 100 characters",
                "password must be a string",
            ]);
        });

        it("Should return error if password has more than 100 characters", () => {
            const isValid = sut.validate({
                ...userDataBuilder({}),
                password: "*".repeat(101),
            });
            expect(isValid).toBeFalsy();
            expect(sut.errors.password).toStrictEqual([
                "password must be shorter than or equal to 100 characters",
            ]);
        });

        it("Should return true if password is valid", () => {
            const props = userDataBuilder({ password: "valid_password" });
            const isValid = sut.validate(props);
            expect(isValid).toBeTruthy();
            expect(sut.errors?.password).toBe(undefined);
            expect(sut.validatedData).toStrictEqual(new UserRules(props));
        });
    });

    describe("createdAt field validation", () => {
        it("Should return createdAt when is not a date instance", () => {
            const isValid = sut.validate({ ...userDataBuilder(), createdAt: 1 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors.createdAt).toStrictEqual(["createdAt must be a Date instance"]);
        });

        it("Should return success when is a date instance", () => {
            const isValid = sut.validate(userDataBuilder());
            expect(isValid).toBeTruthy();
        });

        it("Should return success when is not passed instance", () => {
            const isValid = sut.validate({ ...userDataBuilder(), createdAt: undefined });
            expect(isValid).toBeTruthy();
        });
    });
});
