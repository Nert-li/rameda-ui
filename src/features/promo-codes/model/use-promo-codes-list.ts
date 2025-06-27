import { rqClient } from "@/shared/api/instance";
import { useSorting } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

interface UsePromoCodesListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const usePromoCodesListDefault = (params: UsePromoCodesListParams = {}) => {
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

export const usePromoCodesList = (initialPage = 1, initialLimit = 25) => {
    const sorting = useSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const promoCodesQuery = usePromoCodesListDefault({
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...promoCodesQuery,
        sorting,
        pagination: pagination.formatForUI(promoCodesQuery.pagination),
    };
}; 