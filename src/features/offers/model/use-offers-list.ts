import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseOffersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export const useOffersList = (params: UseOffersListParams = {}) => {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
    };

    const { data, isLoading, isError, refetch } = rqClient.useQuery(
        "get",
        "/offers",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        offers: data?.offers || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
};

// Хук с интегрированной сортировкой
export const useOffersListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'created_at', direction: 'desc' }
    });

    const offersQuery = useOffersList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...offersQuery,
        sorting: serverSorting,
    };
}; 