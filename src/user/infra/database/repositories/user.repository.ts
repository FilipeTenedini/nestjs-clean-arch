import { RepositoryContract } from "@/shared/domain/repositories/repository-contract.repository";
import { UserEntity } from "@/user/domain/entities/user.entity";

export abstract class UserRepository extends RepositoryContract<UserEntity> {
    public abstract findByEmail(email: string): Promise<UserEntity | null>;
}
