import { InMemoryUserRepository } from "@/user/infra/database/repositories/in-memory-user.repository";
import { GetUserUseCase } from "@/user/application/usecases/get-user.usecase";
import { faker } from "@faker-js/faker";
import { UserEntity } from "@/user/domain/entities/user.entity";
import { userDataBuilder } from "../../../tests/helpers/user-data-builder";
import { NotFoundError } from "@/shared/application/errors/not-found-error";

describe("GetUserUseCase unit tests", () => {
    let sut: GetUserUseCase;
    let repository: InMemoryUserRepository;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        sut = new GetUserUseCase(repository);
    });

    it("should throws error when entity is not found", async () => {
        await expect(() => sut.execute(faker.string.uuid())).rejects.toThrow(
            new NotFoundError("User not found"),
        );
    });

    it("should return user", async () => {
        const spyFindById = jest.spyOn(repository, "findById");

        const items = [new UserEntity(userDataBuilder())];

        repository.data = items;

        const result = await sut.execute(items[0].id);

        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject(items[0].toPlain());
    });
});
