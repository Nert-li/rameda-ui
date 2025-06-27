import * as React from "react"
import { IconChevronDown, IconChevronUp, IconArrowsSort } from "@tabler/icons-react"
import { Column } from "@tanstack/react-table"

import { Button } from "@/shared/ui/kit/button"

// Legacy interface for backwards compatibility
interface LegacySortableHeaderProps {
    field: string
    children: React.ReactNode
    sorting: { field: string | null; direction: 'asc' | 'desc' }
    onSort: (field: string) => void
    className?: string
}

// New TanStack Table interface
interface ModernSortableHeaderProps<TData, TValue> {
    column: Column<TData, TValue>
    children: React.ReactNode
    className?: string
}

type SortableHeaderProps<TData = unknown, TValue = unknown> =
    | LegacySortableHeaderProps
    | ModernSortableHeaderProps<TData, TValue>

export function SortableHeader<TData = unknown, TValue = unknown>(
    props: SortableHeaderProps<TData, TValue>
) {
    // Check if using legacy interface
    if ('field' in props) {
        const { field, children, sorting, onSort, className } = props
        const isActive = sorting.field === field
        const direction = isActive ? sorting.direction : null

        return (
            <Button
                variant="ghost"
                onClick={() => onSort(field)}
                className={`h-auto p-0 font-semibold justify-start hover:bg-transparent ${className || ''}`}
            >
                <span>{children}</span>
                <div className="ml-2 flex flex-col">
                    {isActive && direction === 'desc' ? (
                        <IconChevronDown className="h-3 w-3" />
                    ) : isActive && direction === 'asc' ? (
                        <IconChevronUp className="h-3 w-3" />
                    ) : (
                        <IconArrowsSort className="h-3 w-3 opacity-50" />
                    )}
                </div>
            </Button>
        )
    }

    // Modern TanStack Table interface
    const { column, children, className } = props as ModernSortableHeaderProps<TData, TValue>

    if (!column.getCanSort()) {
        return <div className={className}>{children}</div>
    }

    const sorted = column.getIsSorted()

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(sorted === "asc")}
            className={`h-auto p-0 font-semibold justify-start hover:bg-transparent ${className || ''}`}
        >
            <span>{children}</span>
            <div className="ml-2 flex flex-col">
                {sorted === "desc" ? (
                    <IconChevronDown className="h-3 w-3" />
                ) : sorted === "asc" ? (
                    <IconChevronUp className="h-3 w-3" />
                ) : (
                    <IconArrowsSort className="h-3 w-3 opacity-50" />
                )}
            </div>
        </Button>
    )
} 