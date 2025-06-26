import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UsePromoCodesListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const usePromoCodesList = (params: UsePromoCodesListParams = {}) => {
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
        "/promo_codes",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        promoCodes: data?.promo_codes || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

// Хук с интегрированной сортировкой
export const usePromoCodesListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const promoCodesQuery = usePromoCodesList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...promoCodesQuery,
        sorting: serverSorting,
    };
}; 