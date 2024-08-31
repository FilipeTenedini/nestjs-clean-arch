import { HashProviderContract } from "@/shared/application/providers/hash-provider-contract";
import { hash, compare } from "bcryptjs";

export class HashProvider implements HashProviderContract {
    async generateHash(value: string): Promise<string> {
        return hash(value, 10);
    }
    compareHash(value: string, hash: string): Promise<boolean> {
        return compare(value, hash);
    }
}
