import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { BadRequestError } from "../errors/bad-request-error";
import { ConflictError } from "@/shared/errors/conflict-error";
import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { HashProvider } from "@/shared/infra/providers/hash-provider";

export class SignUpUseCase {
    constructor(
        private userRepository: UserRepository,
        private hashProvider: HashProvider,
    ) {}

    async execute(input: UserProps): Promise<UserEntity> {
        const { name, email, password } = input;

        if (!name || !email || !password) {
            throw new BadRequestError("Invalid input");
        }

        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) {
            throw new ConflictError("User already exists");
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const entity = new UserEntity(Object.assign(input, { password: hashedPassword }));

        return this.userRepository.insert(entity);
    }
}
