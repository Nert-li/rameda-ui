import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { DataGrid } from "./data-grid"

// Общие типы для сортировки и пагинации
interface SortingState {
    field: string | null
    direction: 'asc' | 'desc'
}

interface SortingProps {
    handleSort: (field: string) => void
    sorting: SortingState
}

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}

// Конфигурация для таблицы
export interface DataTableConfig<T> {
    getColumns: (handleSort: (field: string) => void, sorting: SortingState) => ColumnDef<T>[]
    searchPlaceholder: string
}

// Пропсы для универсального компонента
interface DataTableWrapperProps<T> {
    data: T[]
    config: DataTableConfig<T>
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
    loadingItemCount?: number
}

export function DataTableWrapper<T>({
    data,
    config,
    sorting,
    pagination,
    isLoading = false,
    loadingItemCount = 25,
}: DataTableWrapperProps<T>) {
    const columns = useMemo(() => {
        return sorting
            ? config.getColumns(sorting.handleSort, sorting.sorting)
            : []
    }, [config, sorting?.handleSort, sorting?.sorting.field, sorting?.sorting.direction])

    return (
        <DataGrid
            data={data}
            viewMode="table"
            columns={columns}
            searchPlaceholder={config.searchPlaceholder}
            enableGlobalFilter={true}
            enablePagination={!!pagination}
            enableColumnVisibility={true}
            isLoading={isLoading}
            loadingItemCount={loadingItemCount}
            pagination={pagination}
            className="w-full"
        />
    )
}

// Экспорт типов для использования в других файлах
export type { SortingState, SortingProps, PaginationProps } 