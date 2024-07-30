import { EnvConfigModule } from "@/shared/infra/env-config/env-config.module";
import { EnvConfigService } from "@/shared/infra/env-config/env-config.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("EnvConfigService unit tests", () => {
    let sut: EnvConfigService; // system under tests

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EnvConfigModule.forRoot()],
            providers: [EnvConfigService],
        }).compile();

        sut = module.get<EnvConfigService>(EnvConfigService);
    });

    it("should be defined", () => {
        expect(sut).toBeDefined();
    });

    it("should return variable PORT", () => {
        expect(sut.getAppPort()).toBe(3000);
    });

    it("should return variable NODE_ENV", () => {
        expect(sut.getNodeEnv()).toBe("test");
    });
});
