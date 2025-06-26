import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseConversionsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const useConversionsList = (params: UseConversionsListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
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

export const useConversionsListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const conversionsQuery = useConversionsList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...conversionsQuery,
        sorting: serverSorting,
    };
}; 