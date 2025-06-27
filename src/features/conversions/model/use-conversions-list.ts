import { rqClient } from "@/shared/api/instance";
import { useSorting } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

interface UseConversionsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useConversionsListDefault = (params: UseConversionsListParams = {}) => {
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
        "/conversions",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        conversions: data?.conversions || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

export const useConversionsList = (initialPage = 1, initialLimit = 25) => {
    const sorting = useSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const conversionsQuery = useConversionsListDefault({
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...conversionsQuery,
        sorting,
        pagination: pagination.formatForUI(conversionsQuery.pagination),
    };
}; 