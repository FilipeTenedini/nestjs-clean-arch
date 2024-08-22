export type SearchProps<F> = {
    page?: number;
    limit?: number;
    sort?: string | null;
    sortOrder?: "asc" | "desc" | null;
    filter?: F | null;
};

export abstract class RepositoryContract<P, E> {
    public abstract insert(entity: E): Promise<E>;
    public abstract update(entity: E): Promise<E>;
    public abstract delete(id: string): Promise<void>;
    public abstract findById(id: string): Promise<E | null>;
    public abstract findAll(params: SearchProps<P>): Promise<E[]>;
}
