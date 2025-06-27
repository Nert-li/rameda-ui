import { rqClient } from "@/shared/api/instance";
import { useSorting } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

interface UseUsersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useUsersListDefault = (params: UseUsersListParams = {}) => {
    const { sortParams = {}, filters = {}, page, limit } = params;

    // Объединяем параметры сортировки, фильтрации и пагинации
    const queryParams = {
        ...sortParams,
        ...filters,
        ...(page && { page }),
        ...(limit && { limit })
    };

    const { data, isLoading, isError, refetch } = rqClient.useQuery(
        "get",
        "/users",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        users: data?.users || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

export const useUsersList = (initialPage = 1, initialLimit = 25) => {
    const sorting = useSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const usersQuery = useUsersListDefault({
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...usersQuery,
        sorting,
        pagination: pagination.formatForUI(usersQuery.pagination),
    };
};
