export interface SearchInputDTO<F> {
    page?: number;
    limit?: number;
    sort?: string | null;
    sortOrder?: "asc" | "desc" | null;
    filter?: F | null;
}
