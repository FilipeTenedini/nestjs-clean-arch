import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { UserProps } from "@/user/domain/entities/user.entity";
import { NotFoundError } from "@/shared/errors/not-found-error";
import { UseCaseContract } from "@/shared/application/usecases/use-case-contract";

export class GetUserUseCase implements UseCaseContract<string, UserProps> {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<UserProps> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user.toPlain();
    }
}
