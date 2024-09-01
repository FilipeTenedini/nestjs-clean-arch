import { BaseEntity } from "@/shared/domain/entities/base-entity";
import { PaginationResult } from "../dto/pagination-result";

export class PaginationResultDtoMapper {
    public toOutput<P, E extends BaseEntity<P>>(
        items: E[],
        currentPage: number,
        lastPage: number,
        perPage: number,
    ): PaginationResult<P> {
        return {
            items: items.map((item) => item.toPlain()),
            total: items.length,
            currentPage,
            lastPage,
            perPage,
        };
    }
}
