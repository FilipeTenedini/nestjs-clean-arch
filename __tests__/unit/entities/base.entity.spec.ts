import { validate as validateUuid } from "uuid";
import { BaseEntity } from "@/shared/domain/entities/base-entity";
import { faker } from "@faker-js/faker";

type StubProps = {
    prop1: string;
    prop2: number;
};

class StubEntity extends BaseEntity<StubProps> {}

describe("BaseEntity unit tests", () => {
    it("Should set props and id", () => {
        const props: StubProps = {
            prop1: "value 1",
            prop2: faker.number.int(),
        };

        const entity = new StubEntity(props);

        expect(entity.props).toStrictEqual(props);
        expect(entity.id).not.toBeNull();
        expect(validateUuid(entity.id)).toBeTruthy();
    });

    it("Should accept a valid uuid", () => {
        const props: StubProps = {
            prop1: "value 1",
            prop2: faker.number.int(),
        };
        const id = "ff9b94f2-1dfa-45a2-b2f0-18b06f34de94";
        const entity = new StubEntity(props, id);

        expect(validateUuid(entity.id)).toBeTruthy();
        expect(entity.id).toEqual(id);
    });
});
