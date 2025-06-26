import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseUsersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const useUsersList = (params: UseUsersListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
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
export const useUsersListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const usersQuery = useUsersList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...usersQuery,
        sorting: serverSorting,
    };
};