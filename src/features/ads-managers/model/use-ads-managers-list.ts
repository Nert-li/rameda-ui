import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseAdsManagersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const useAdsManagersList = (params: UseAdsManagersListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
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
export const useAdsManagersListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const adsManagersQuery = useAdsManagersList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...adsManagersQuery,
        sorting: serverSorting,
    };
}; 