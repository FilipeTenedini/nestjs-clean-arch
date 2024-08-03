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
        });
    });
});
