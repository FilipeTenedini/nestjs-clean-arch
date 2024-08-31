import { HashProvider } from "@/shared/infra/providers/hash-provider";

describe("HashProvider unit tests", () => {
    let sut: HashProvider;

    beforeEach(() => {
        sut = new HashProvider();
    });

    it("should return encrypted password", async () => {
        const password = "passwordTest123";
        const hash = await sut.generateHash(password);

        expect(hash).not.toBe(password);
        expect(hash).toBeDefined();
    });

    it("should return false on invalid password and hash comparision", async () => {
        const password = "passwordTest123";
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash("fakee", hash);

        expect(result).toBeFalsy();
    });

    it("should return true on valid password and hash comparision", async () => {
        const password = "passwordTest123";
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash(password, hash);

        expect(result).toBeTruthy();
    });
});
