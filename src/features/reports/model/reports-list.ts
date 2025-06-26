import { rqClient } from "@/shared/api/instance";
import { useServerSorting } from "@/shared/lib/react/use-server-sorting";

interface UseReportsListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
}

export function useReportsList(params: UseReportsListParams = {}) {
    const { sortParams = {}, filters = {} } = params;

    // Объединяем параметры сортировки и фильтрации
    const queryParams = {
        ...sortParams,
        ...filters
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

export const useReportsListWithSorting = () => {
    const serverSorting = useServerSorting({
        defaultSort: { field: 'report_date', direction: 'desc' }
    });

    const reportsQuery = useReportsList({
        sortParams: serverSorting.getSortParams()
    });

    return {
        ...reportsQuery,
        sorting: serverSorting,
    };
}; 