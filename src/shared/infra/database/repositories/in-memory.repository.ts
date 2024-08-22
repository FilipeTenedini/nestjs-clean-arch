import { BaseEntity } from "@/shared/domain/entities/base-entity";
import {
    RepositoryContract,
    SearchProps,
} from "@/shared/domain/repositories/repository-contract.repository";

export class InMemoryRepository<P, E extends BaseEntity<P>>
    implements RepositoryContract<P, E>
{
    data: E[] = [];

    public async insert(entity: E): Promise<E> {
        this.data.push(entity);
        return entity;
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

    public async findAll({
        filter,
        limit = 15,
        page,
        sort,
        sortOrder,
    }: SearchProps<P>): Promise<E[]> {
        let result = this.data.filter((entity) => {
            return Object.keys(filter).every((key) => {
                if (filter[key] !== undefined) {
                    return entity[key] === filter[key];
                }
                return true;
            });
        });

        if (sort) {
            result.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a[sort!] > b[sort!] ? 1 : -1;
                } else {
                    return a[sort!] < b[sort!] ? 1 : -1;
                }
            });
        }

        if (page && limit) {
            const start = (page - 1) * limit;
            result = result.slice(start, start + limit);
        }

        return result;
    }
}
