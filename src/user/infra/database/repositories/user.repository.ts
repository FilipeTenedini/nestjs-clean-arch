import { RepositoryContract } from "@/shared/domain/repositories/repository-contract.repository";
import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";

export abstract class UserRepository extends RepositoryContract<UserProps, UserEntity> {
    public abstract findByEmail(email: string): Promise<UserEntity | null>;
}
