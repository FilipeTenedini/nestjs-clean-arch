export abstract class HashProviderContract {
    public abstract generateHash(value: string): Promise<string>;
    public abstract compareHash(value: string, hash: string): Promise<boolean>;
}
