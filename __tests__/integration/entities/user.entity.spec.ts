import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { userDataBuilder } from "../../helpers/user-data-builder";
import { EntityValidationError } from "@/shared/errors/validation-error";

describe("UserEntity integration tests", () => {
    describe("constructor method", () => {
        let props: UserProps;
        beforeEach(() => {
            props = userDataBuilder({});
        });
        it("Should throw an error when creating user with invalid name", () => {
            expect(() => new UserEntity({ ...props, name: null })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, name: "" })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, name: "s".repeat(256) })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, name: 256 as any })).toThrow(
                EntityValidationError,
            );
        });
        it("Should throw an error when creating user with invalid email", () => {
            expect(() => new UserEntity({ ...props, email: null })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, email: "" })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, email: "s".repeat(256) })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, email: 256 as any })).toThrow(
                EntityValidationError,
            );
        });
    });
});
