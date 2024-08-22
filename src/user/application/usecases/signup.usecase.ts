import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { ConflictError } from "@/shared/errors/conflict-error";
import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";

export class SignUpUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(input: UserProps): Promise<UserEntity> {
        const { name, email, password } = input;

        if (!name || !email || !password) {
            throw new BadRequestError("Invalid input");
        }

        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) {
            throw new ConflictError("User already exists");
        }

        const entity = new UserEntity(input);

        return this.userRepository.insert(entity);
    }
}
