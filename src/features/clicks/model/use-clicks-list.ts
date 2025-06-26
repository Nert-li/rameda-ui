import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseClicksListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const useClicksList = (params: UseClicksListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
    };

    const { data, isLoading, isError, refetch } = rqClient.useQuery(
        "get",
        "/clicks",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        clicks: data?.clicks || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

// Хук с интегрированной сортировкой
export const useClicksListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const clicksQuery = useClicksList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...clicksQuery,
        sorting: serverSorting,
    };
}; 