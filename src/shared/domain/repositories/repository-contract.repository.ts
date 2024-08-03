export abstract class RepositoryContract<E> {
    public abstract insert(entity: E): Promise<void>;
    public abstract update(entity: E): Promise<E>;
    public abstract delete(id: string): Promise<void>;
    public abstract findById(id: string): Promise<E | null>;
    public abstract findAll(): Promise<E[]>;
}
