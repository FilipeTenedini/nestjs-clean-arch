export interface PaginationResult<E> {
    items: E[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
}
