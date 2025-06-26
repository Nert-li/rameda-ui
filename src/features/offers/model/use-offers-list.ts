import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseOffersListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export const useOffersList = (params: UseOffersListParams = {}) => {
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
export const useOffersListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'created_at',
        defaultDirection: 'desc'
    });

    const offersQuery = useOffersList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...offersQuery,
        sorting: serverSorting,
    };
}; 