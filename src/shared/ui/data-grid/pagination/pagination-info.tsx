import * as React from "react"
import type { PaginationConfig } from "../../types/table.types"
import { calculatePageInfo } from "../../utils/pagination.utils"

interface PaginationInfoProps {
    pagination: PaginationConfig
    className?: string
}

export function PaginationInfo({
    pagination,
    className = ""
}: PaginationInfoProps) {
    const { currentPage, pageSize, totalCount } = pagination

    const { startItem, endItem } = calculatePageInfo(
        currentPage,
        pageSize,
        totalCount
    )

    if (totalCount === 0) {
        return (
            <div className={`text-sm text-muted-foreground ${className}`}>
                No items found
            </div>
        )
    }

    return (
        <div className={`text-sm text-muted-foreground ${className}`}>
            Showing {startItem} to {endItem} of {totalCount} entries
        </div>
    )
} 