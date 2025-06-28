import { rqClient } from "@/shared/api/instance";
import { useSorting, UseSortingReturn } from "@/shared/lib/react/use-sorting";
import { usePagination } from "@/shared/lib/react/use-pagination";

// Типы для стандартных ответов API (только уникальные)
interface ApiStats {
    total?: number;
    [key: string]: unknown;
}

interface ApiPagination {
    current_page: number;
    total_pages: number;
    total_count: number;
    page_size: number;
}

// Типы для результата formatForUI из use-pagination
type UIPagination = NonNullable<ReturnType<ReturnType<typeof usePagination>['formatForUI']>>;

// Интерфейс для ответа API
type ApiResponse<T extends string, D = unknown> = {
    [K in T]: D[];
} & {
    stats?: ApiStats;
    pagination?: ApiPagination;
    sorting?: { field: string | null; direction: 'asc' | 'desc' };
}

// Конфигурация для API хука
interface ListConfig<T extends string> {
    endpoint: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    dataKey: T;
    defaultSortField?: string;
    defaultSortDirection?: 'asc' | 'desc';
}

// Параметры для запроса
interface ListParams {
    sortParams?: Record<string, string>;
    filters?: Record<string, string>;
    page?: number;
    limit?: number;
}

// Результат базового хука
type ListResult<T extends string, D = unknown> = {
    [K in T]: D[];
} & {
    isLoading: boolean;
    isError: boolean;
    stats?: ApiStats;
    pagination?: ApiPagination;
    sorting?: { field: string | null; direction: 'asc' | 'desc' };
    refetch: () => void;
};

// Результат хука с интегрированной сортировкой и пагинацией
type ListWithControlsResult<T extends string, D = unknown> = {
    [K in T]: D[];
} & {
    isLoading: boolean;
    isError: boolean;
    stats?: ApiStats;
    pagination?: UIPagination;
    sorting: UseSortingReturn;
    refetch: () => void;
};

/**
 * Базовый универсальный хук для работы с API списками
 */
export function useListDefault<T extends string, D = unknown>(
    config: ListConfig<T>,
    params: ListParams = {}
): ListResult<T, D> {
    const { sortParams = {}, filters = {}, page, limit } = params;

    // Объединяем параметры сортировки, фильтрации и пагинации
    const queryParams = {
        ...sortParams,
        ...filters,
        ...(page && { page }),
        ...(limit && { limit })
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, isLoading, isError, refetch } = (rqClient.useQuery as any)(
        config.method || "get",
        config.endpoint,
        {
            params: {
                query: queryParams
            }
        }
    );

    const typedData = data as ApiResponse<T, D> | undefined;

    return {
        [config.dataKey]: typedData?.[config.dataKey] || [],
        isLoading,
        isError,
        stats: typedData?.stats,
        pagination: typedData?.pagination,
        sorting: typedData?.sorting,
        refetch,
    } as ListResult<T, D>;
}

/**
 * Универсальный хук с интегрированной сортировкой и пагинацией
 */
export function useList<T extends string, D = unknown>(
    config: ListConfig<T>,
    initialPage = 1,
    initialLimit = 25
): ListWithControlsResult<T, D> {
    const sorting = useSorting({
        defaultField: config.defaultSortField || 'created_at',
        defaultDirection: config.defaultSortDirection || 'desc'
    });

    const pagination = usePagination(initialPage, initialLimit);

    const listQuery = useListDefault<T, D>(config, {
        sortParams: sorting.getSortParams(),
        page: pagination.page,
        limit: pagination.limit
    });

    return {
        ...listQuery,
        sorting,
        pagination: pagination.formatForUI(listQuery.pagination),
    } as ListWithControlsResult<T, D>;
}

/**
 * Фабрика для создания специфических хуков для конкретной сущности
 */
export function createListHooks<T extends string, D = unknown>(config: ListConfig<T>) {
    const useEntityListDefault = (params: ListParams = {}) =>
        useListDefault<T, D>(config, params);

    const useEntityList = (initialPage = 1, initialLimit = 25) =>
        useList<T, D>(config, initialPage, initialLimit);

    return {
        useEntityListDefault,
        useEntityList
    };
}

// Экспорт типов для переиспользования
export type { ListConfig, ListParams, ListResult, ListWithControlsResult }; 