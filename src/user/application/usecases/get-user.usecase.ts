import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { UseCaseContract } from "@/shared/application/usecases/use-case-contract";
import { NotFoundError } from "@/shared/application/errors/not-found-error";

export class GetUserUseCase implements UseCaseContract<string, UserProps> {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }
}
