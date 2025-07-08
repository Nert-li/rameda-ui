// ==========================================
// MAIN COMPONENT
// ==========================================

export { DataGrid } from "./data-grid"

// ==========================================
// SUB-COMPONENTS
// ==========================================

export { TableView } from "./table-view"
export { CardsView } from "./cards-view"

// Skeleton components
export { FiltersSkeleton, PaginationSkeleton, TableSkeleton, CompactPaginationSkeleton } from "./skeletons"

// ==========================================
// LEGACY SUPPORT (for backwards compatibility)
// ==========================================

// These provide backwards compatibility with existing imports
export { DataGrid as DataTable } from "./data-grid"
export { DataGrid as UniversalDataTable } from "./data-grid"

// Export sortable header if it exists
export { SortableHeader } from "./sortable-header"

// ==========================================
// TYPES
// ==========================================

export type {
    DataGridProps,
    DataTableProps,
    CardGridProps,
    ViewMode,
    PaginationConfig,
    SortingConfig,
} from "./types"

// ==========================================
// HOOKS & UTILITIES (if needed in future)
// ==========================================

// Placeholder for future extensions
// export { useDataGrid } from "./hooks/use-data-grid"

// DataTable wrapper for easy migration
export { DataTableWrapper } from "./data-table-wrapper"
export type {
    DataTableConfig,
    SortingState,
    SortingProps,
    PaginationProps
} from "./data-table-wrapper"

// Legacy compatibility exports
export type { DataGridProps as UniversalDataTableProps } from "./types" 