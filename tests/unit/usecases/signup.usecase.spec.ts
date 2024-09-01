import { HashProviderContract } from "@/shared/application/providers/hash-provider-contract";
import { HashProvider } from "@/shared/infra/providers/hash-provider";
import { SignUpUseCase } from "@/user/application/usecases/signup.usecase";
import { InMemoryUserRepository } from "@/user/infra/database/repositories/in-memory-user.repository";
import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { userDataBuilder } from "../../../tests/helpers/user-data-builder";
import { ConflictError } from "@/shared/errors/conflict-error";
import { BadRequestError } from "@/user/application/errors/bad-request-error";

describe("SignUpUseCase unit tests", () => {
    let sut: SignUpUseCase;
    let repository: UserRepository;
    let hashProvider: HashProviderContract;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        hashProvider = new HashProvider();
        sut = new SignUpUseCase(repository, hashProvider);
    });

    it("should create a user", async () => {
        const spyInsert = jest.spyOn(repository, "insert");
        const props = userDataBuilder();
        const result = await sut.execute(props);

        expect(result.id).toBeDefined();
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(spyInsert).toHaveBeenCalledTimes(1);
    });

    it("should not be able to register with same email twice", async () => {
        const props = userDataBuilder({ email: "a@a.com" });
        await sut.execute(props);

        await expect(sut.execute(props)).rejects.toBeInstanceOf(ConflictError);
    });

    it("should throw error with name not provided", async () => {
        const props = Object.assign(userDataBuilder(), { name: null });

        await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should throw error with email not provided", async () => {
        const props = Object.assign(userDataBuilder(), { email: null });

        await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should throw error with password not provided", async () => {
        const props = Object.assign(userDataBuilder(), { password: null });

        await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError);
    });
});
