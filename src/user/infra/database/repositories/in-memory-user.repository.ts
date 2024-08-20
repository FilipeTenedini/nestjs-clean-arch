import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { UserRepository } from "./user.repository";
import { InMemoryRepository } from "@/shared/infra/database/repositories/in-memory.repository";

export class InMemoryUserRepository
    extends InMemoryRepository<UserProps, UserEntity>
    implements UserRepository
{
    public async findByEmail(email: string): Promise<UserEntity | null> {
        return this.data.find((user) => user.email === email);
    }
}
