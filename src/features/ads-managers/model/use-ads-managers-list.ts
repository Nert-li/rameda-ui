import { rqClient } from "@/shared/api/instance";
import { useSorting } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

interface UseAdsManagersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useAdsManagersListDefault = (params: UseAdsManagersListParams = {}) => {
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

export const useAdsManagersList = (initialPage = 1, initialLimit = 25) => {
    const sorting = useSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const adsManagersQuery = useAdsManagersListDefault({
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...adsManagersQuery,
        sorting,
        pagination: pagination.formatForUI(adsManagersQuery.pagination),
    };
}; 