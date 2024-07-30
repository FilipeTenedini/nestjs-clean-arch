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
});
