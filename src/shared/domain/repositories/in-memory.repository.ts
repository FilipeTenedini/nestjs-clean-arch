import { BaseEntity } from "../entities/base-entity";
import { RepositoryContract } from "./repository-contract.repository";

export class InMemoryRepository<P, E extends BaseEntity<P>> implements RepositoryContract<E> {
    data: E[] = [];

    public async insert(entity: E): Promise<void> {
        this.data.push(entity);
    }

    public async update(entity: E): Promise<E> {
        const item = this.data.findIndex((i) => i.id === entity.id);
        this.data[item] = entity;
        return this.data[item];
    }

    public async delete(id: string): Promise<void> {
        const itemIndex = this.data.findIndex((i) => i.id === id);
        this.data.splice(itemIndex, 1);
    }

    public async findById(id: string): Promise<E | null> {
        return this.data.find((entity) => entity.id === id);
    }

    public async findAll(): Promise<E[]> {
        return this.data;
    }
}
