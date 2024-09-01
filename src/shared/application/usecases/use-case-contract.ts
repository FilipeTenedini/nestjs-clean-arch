export abstract class UseCaseContract<T, E> {
    public abstract execute(params: T): Promise<E>;
}
