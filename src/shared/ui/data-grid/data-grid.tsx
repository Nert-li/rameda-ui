import {
    IconLayoutColumns,
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react"
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"

import { Input } from "@/shared/ui/kit/input"
import { Button } from "@/shared/ui/kit/button"
import { Label } from "@/shared/ui/kit/label"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/kit/select"

import type { DataGridProps } from "./types"
import { TableView } from "./table-view"
import { CardsView } from "./cards-view"
import { FiltersSkeleton, PaginationSkeleton } from "./skeletons"
import { useEffect, useState } from "react"

// Pagination controls component
function PaginationControls<TData>({ table }: { table: ReturnType<typeof useReactTable<TData>> }) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()
    const pageSize = table.getState().pagination.pageSize
    const totalCount = table.getRowCount()

    return (
        <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                Showing {((currentPage - 1) * pageSize) + 1} to{" "}
                {Math.min(currentPage * pageSize, totalCount)} of{" "}
                {totalCount} entries
            </div>

            <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="hidden items-center gap-2 lg:flex">
                    <Label htmlFor="rows-per-page" className="text-sm font-medium">
                        Rows per page
                    </Label>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => table.setPageSize(Number(value))}
                    >
                        <SelectTrigger className="w-20" id="rows-per-page">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[25, 50, 100].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex w-fit items-center justify-center text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>

                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <IconChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="size-8"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden size-8 lg:flex"
                        size="icon"
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <IconChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function DataGrid<TData>({
    // Core data
    data,

    // View configuration - режим задается через код, без UI переключателя
    viewMode = 'table',

    // Table mode props
    columns,

    // Card mode props
    renderCard,
    cardClassName,
    cardsPerRow = 3,

    // Shared features
    enableGlobalFilter = true,
    enablePagination = true,
    enableColumnVisibility = true,

    // Customization
    searchPlaceholder = "Search...",
    emptyMessage = "No results.",
    className = "",

    // Loading state
    isLoading = false,
    loadingItemCount,

    // Callbacks
    onRowClick,
    onItemClick,
}: DataGridProps<TData>) {
    // Global filter state
    const [globalFilter, setGlobalFilter] = useState("")

    // Table setup for both modes (для пагинации и фильтрации)
    const table = useReactTable({
        data,
        columns: columns || [],
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            pagination: {
                pageSize: 25,
            },
        },
    })

    // Get current page data
    const currentPageData = enablePagination ? table.getRowModel().rows.map(row => row.original) : data

    // Set loading item count based on view mode if not provided
    const effectiveLoadingItemCount = loadingItemCount ?? (viewMode === 'table' ? 25 : 9)

    // Validate required props based on view mode
    useEffect(() => {
        if (viewMode === 'table' && !columns) {
            console.warn('DataGrid: columns prop is required when viewMode is "table"')
        }
        if (viewMode === 'cards' && !renderCard) {
            console.warn('DataGrid: renderCard prop is required when viewMode is "cards"')
        }
    }, [viewMode, columns, renderCard])

    return (
        <div className={className}>
            {/* Top toolbar - фильтры и контролы */}
            {isLoading ? (
                <FiltersSkeleton
                    showSearchFilter={enableGlobalFilter}
                    showColumnButton={viewMode === 'table' && enableColumnVisibility && !!columns}
                />
            ) : (
                <div className="flex items-center justify-between px-4 lg:px-6 p-4">
                    <div className="flex items-center gap-4">
                        {enableGlobalFilter && (
                            <Input
                                placeholder={searchPlaceholder}
                                value={globalFilter ?? ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                className="max-w-sm"
                            />
                        )}
                    </div>

                    {/* Кнопка выбора колонок - только для таблицы */}
                    {viewMode === 'table' && enableColumnVisibility && columns && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <IconLayoutColumns className="h-4 w-4" />
                                    <span className="hidden lg:inline ml-2">Customize Columns</span>
                                    <span className="lg:hidden ml-2">Columns</span>
                                    <IconChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) =>
                                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                                    )
                                    .map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            )}

            {/* Content based on view mode */}
            {viewMode === 'table' ? (
                <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                    {columns ? (
                        <TableView
                            table={table}
                            isLoading={isLoading}
                            loadingRowCount={effectiveLoadingItemCount}
                            emptyMessage={emptyMessage}
                            onRowClick={onRowClick}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-32 text-muted-foreground">
                            Table view requires columns prop
                        </div>
                    )}

                    {/* Pagination - для таблицы */}
                    {enablePagination && (
                        isLoading ? (
                            <PaginationSkeleton />
                        ) : (
                            data.length > 0 && <PaginationControls<TData> table={table} />
                        )
                    )}
                </div>
            ) : (
                <div className="px-4 lg:px-6">
                    {renderCard ? (
                        <>
                            <CardsView
                                data={currentPageData}
                                renderCard={renderCard}
                                cardClassName={cardClassName}
                                cardsPerRow={cardsPerRow}
                                isLoading={isLoading}
                                loadingItemCount={effectiveLoadingItemCount}
                                emptyMessage={emptyMessage}
                                onItemClick={onItemClick}
                            />

                            {/* Pagination - для карточек */}
                            {enablePagination && (
                                <div className="mt-4">
                                    {isLoading ? (
                                        <PaginationSkeleton />
                                    ) : (
                                        data.length > 0 && <PaginationControls<TData> table={table} />
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-muted-foreground">
                            Cards view requires renderCard prop
                        </div>
                    )}
                </div>
            )}
        </div>
    )
} 