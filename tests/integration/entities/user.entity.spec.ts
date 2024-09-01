import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { userDataBuilder } from "../../helpers/user-data-builder";
import { EntityValidationError } from "@/shared/application/errors/validation-error";

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
        it("Should throw an error when creating user with invalid password", () => {
            expect(() => new UserEntity({ ...props, password: null })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, password: "" })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, password: "s".repeat(101) })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, password: 256 as any })).toThrow(
                EntityValidationError,
            );
        });
        it("Should throw an error when creating user with invalid createdAt", () => {
            expect(() => new UserEntity({ ...props, createdAt: 2023 as any })).toThrow(
                EntityValidationError,
            );
            expect(() => new UserEntity({ ...props, createdAt: "2023" as any })).toThrow(
                EntityValidationError,
            );
        });
        it("Should create a valid user", () => {
            const user = new UserEntity(props);
            expect(user).toBeInstanceOf(UserEntity);
            expect(user.props).toStrictEqual(props);
        });
    });

    describe("update method", () => {
        let props: UserProps;
        beforeEach(() => {
            props = userDataBuilder({});
        });
        it("Should throw an error when updating an user with invalid name", () => {
            const entity = new UserEntity(props);

            expect(() => entity.update(null)).toThrow(EntityValidationError);
            expect(() => entity.update(1 as any)).toThrow(EntityValidationError);
            expect(() => entity.update("s".repeat(256))).toThrow(EntityValidationError);
            expect(() => entity.update("")).toThrow(EntityValidationError);
        });
        it("Should success change user entity name with update function", () => {
            const entity = new UserEntity(props);
            const newName = "other name";
            entity.update(newName);
            expect(entity.name).toStrictEqual(newName);
        });
    });

    describe("updatePassword method", () => {
        let props: UserProps;
        beforeEach(() => {
            props = userDataBuilder({});
        });
        it("Should throw an error when updating password of an user with invalid password field", () => {
            const entity = new UserEntity(props);

            expect(() => entity.updatePassword(null)).toThrow(EntityValidationError);
            expect(() => entity.updatePassword(1 as any)).toThrow(EntityValidationError);
            expect(() => entity.updatePassword("s".repeat(101))).toThrow(
                EntityValidationError,
            );
            expect(() => entity.updatePassword("")).toThrow(EntityValidationError);
        });
        it("Should success change user entity password with updatePassword function", () => {
            const entity = new UserEntity(props);
            const newPassword = "other_password";
            entity.updatePassword(newPassword);
            expect(entity.password).toStrictEqual(newPassword);
        });
    });
});
