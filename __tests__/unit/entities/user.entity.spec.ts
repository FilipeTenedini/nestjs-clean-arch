import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { userDataBuilder } from "../helpers/user-data-builder";

describe("UserEntity unit tests", () => {
    let sut: UserEntity;
    let props: UserProps;

    beforeEach(() => {
        props = userDataBuilder();

        sut = new UserEntity(props);
    });

    it("should be instanciate class", () => {
        expect(sut.props.name).toEqual(props.name);
        expect(sut.props.email).toEqual(props.email);
        expect(sut.props.password).toEqual(props.password);
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });

    describe("Getters", () => {
        it("Getter of name field", () => {
            expect(sut.name).toBeDefined();
            expect(sut.name).toEqual(props.name);
            expect(typeof sut.name).toBe("string");
        });

        it("Getter of email field", () => {
            expect(sut.email).toBeDefined();
            expect(sut.email).toEqual(props.email);
            expect(typeof sut.email).toBe("string");
        });

        it("Getter of password field", () => {
            expect(sut.password).toBeDefined();
            expect(sut.password).toEqual(props.password);
            expect(typeof sut.password).toBe("string");
        });

        it("Getter of createdAt field", () => {
            expect(sut.createdAt).toBeDefined();
            expect(sut.createdAt).toBeInstanceOf(Date);
        });
    });
});
