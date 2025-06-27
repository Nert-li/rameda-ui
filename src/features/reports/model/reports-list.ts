import { rqClient } from "@/shared/api/instance";
import { useSorting } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

interface UseReportsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

export function useReportsListDefault(params: UseReportsListParams = {}) {
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

export const useReportsList = (initialPage = 1, initialLimit = 25) => {
    const sorting = useSorting({
        defaultField: 'report_date',
        defaultDirection: 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const reportsQuery = useReportsListDefault({
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...reportsQuery,
        sorting,
        pagination: pagination.formatForUI(reportsQuery.pagination),
    };
}; 