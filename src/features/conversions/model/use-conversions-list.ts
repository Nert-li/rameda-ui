import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseConversionsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useConversionsList = (params: UseConversionsListParams = {}) => {
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

export const useConversionsListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const conversionsQuery = useConversionsList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...conversionsQuery,
        sorting: serverSorting,
    };
}; 