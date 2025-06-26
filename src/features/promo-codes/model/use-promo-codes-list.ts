import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UsePromoCodesListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const usePromoCodesList = (params: UsePromoCodesListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
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
export const usePromoCodesListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const promoCodesQuery = usePromoCodesList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...promoCodesQuery,
        sorting: serverSorting,
    };
}; 