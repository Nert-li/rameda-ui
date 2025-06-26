import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseUsersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useUsersList = (params: UseUsersListParams = {}) => {
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

// Хук с интегрированной сортировкой
export const useUsersListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const usersQuery = useUsersList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...usersQuery,
        sorting: serverSorting,
    };
};