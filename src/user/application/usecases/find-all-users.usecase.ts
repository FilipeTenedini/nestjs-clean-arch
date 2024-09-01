import { UserRepository } from "@/user/infra/database/repositories/user.repository";
import { UserEntity, UserProps } from "@/user/domain/entities/user.entity";
import { UseCaseContract } from "@/shared/application/usecases/use-case-contract";
import { SearchInputDTO } from "@/shared/application/dto/search-input.dto";
import { PaginationResult } from "@/shared/application/dto/pagination-result";
import { PaginationResultDtoMapper } from "@/shared/application/mapper/pagination-output.mapper";

export class FindAllUsersUseCase
    implements UseCaseContract<SearchInputDTO<UserProps>, PaginationResult<UserProps>>
{
    constructor(
        private userRepository: UserRepository,
        private readonly paginationResultMapper: PaginationResultDtoMapper,
    ) {}

    async execute(params: SearchInputDTO<UserProps>): Promise<PaginationResult<UserProps>> {
        const entities = await this.userRepository.findAll(params);
        return this.toOutput(entities, params.page, 2, params.limit);
    }

    private toOutput(entities: UserEntity[], page: number, lastPage: number, perPage: number) {
        return this.paginationResultMapper.toOutput<UserProps, UserEntity>(
            entities,
            page,
            lastPage,
            perPage,
        );
    }
}
