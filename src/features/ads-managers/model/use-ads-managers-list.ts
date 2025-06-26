import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseAdsManagersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useAdsManagersList = (params: UseAdsManagersListParams = {}) => {
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
        "/ads_managers",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        adsManagers: data?.ads_managers || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

// Хук с интегрированной сортировкой
export const useAdsManagersListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const adsManagersQuery = useAdsManagersList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...adsManagersQuery,
        sorting: serverSorting,
    };
}; 