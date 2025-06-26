import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseReportsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export function useReportsList(params: UseReportsListParams = {}) {
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
        "/reports",
        {
            params: {
                query: queryParams
            }
        }
    );

    return {
        reports: data?.reports || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
        sorting: data?.sorting,
        refetch,
    };
}

export const useReportsListWithSorting = (paginationParams?: { page?: number, limit?: number }) => {
    const serverSorting = useServerSorting({
        defaultField: 'report_date',
        defaultDirection: 'desc'
    });

    const reportsQuery = useReportsList({
        sortParams: serverSorting.getSortParams(),
        ...paginationParams
    });

    return {
        ...reportsQuery,
        sorting: serverSorting,
    };
}; 