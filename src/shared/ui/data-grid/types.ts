import type { ColumnDef, Row } from "@tanstack/react-table"

// ==========================================
// CORE TYPES
// ==========================================

export type ViewMode = 'table' | 'cards'

// Pagination configuration - только серверная пагинация
export interface PaginationConfig {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
    pageSizeOptions?: number[]
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
}

// Sorting configuration - только серверная сортировка
export interface SortingConfig {
    onSortChange?: (field: string, direction: 'asc' | 'desc') => void
}

// ==========================================
// COMPONENT PROPS
// ==========================================

// Main DataGrid component props
export interface DataGridProps<TData> {
    // Core data
    data: TData[]

    // View configuration - режим задается в коде, не через UI
    viewMode?: ViewMode

    // Table mode props
    columns?: ColumnDef<TData>[]

    // Card mode props
    renderCard?: (item: TData, index: number) => React.ReactNode
    cardClassName?: string
    cardsPerRow?: number

    // Shared features
    enableGlobalFilter?: boolean
    enablePagination?: boolean
    enableSorting?: boolean
    enableColumnVisibility?: boolean

    // Customization
    searchPlaceholder?: string
    emptyMessage?: string
    className?: string

    // Loading state
    isLoading?: boolean
    loadingItemCount?: number // Если не указан: 25 для таблиц, 9 для карточек

    // Server-side configuration
    pagination?: PaginationConfig
    sorting?: SortingConfig

    // Callbacks
    onRowClick?: (row: Row<TData>) => void
    onItemClick?: (item: TData, index: number) => void
}

// Table-specific props (for internal table component)
export interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    className?: string
    enableGlobalFilter?: boolean
    searchPlaceholder?: string
    emptyMessage?: string
    isLoading?: boolean
    loadingRowCount?: number
    pagination?: PaginationConfig
    sorting?: SortingConfig
    onRowClick?: (row: Row<TData>) => void
}

// Card grid specific props
export interface CardGridProps<TData> {
    data: TData[]
    renderCard: (item: TData, index: number) => React.ReactNode
    className?: string
    cardClassName?: string
    cardsPerRow?: number
    emptyMessage?: string
    isLoading?: boolean
    loadingItemCount?: number
    onItemClick?: (item: TData, index: number) => void
} 