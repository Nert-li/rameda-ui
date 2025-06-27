// ==========================================
// MAIN COMPONENT
// ==========================================

export { DataGrid } from "./data-grid"

// ==========================================
// SUB-COMPONENTS
// ==========================================

export { TableView } from "./table-view"
export { CardsView } from "./cards-view"
export { ViewToggle } from "./components/view-toggle"

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