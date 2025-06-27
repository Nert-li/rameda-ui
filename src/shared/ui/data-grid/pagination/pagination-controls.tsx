import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react"

import { Button } from "@/shared/ui/kit/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/kit/select"
import type { PaginationConfig } from "../types"

interface PaginationControlsProps {
    pagination: PaginationConfig
    className?: string
}

export function PaginationControls({
    pagination,
    className = ""
}: PaginationControlsProps) {
    const {
        currentPage,
        totalPages,
        pageSize,
        pageSizeOptions = [25, 50, 100],
        onPageChange,
        onPageSizeChange,
    } = pagination

    const canGoToPrevious = currentPage > 1
    const canGoToNext = currentPage < totalPages

    return (
        <div className={`flex items-center justify-between gap-4 ${className}`}>
            {/* Page size selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page</span>
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => onPageSizeChange(Number(value))}
                >
                    <SelectTrigger className="w-16">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={!canGoToPrevious}
                    aria-label="Go to first page"
                >
                    <IconChevronsLeft />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!canGoToPrevious}
                    aria-label="Go to previous page"
                >
                    <IconChevronLeft />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!canGoToNext}
                    aria-label="Go to next page"
                >
                    <IconChevronRight />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    disabled={!canGoToNext}
                    aria-label="Go to last page"
                >
                    <IconChevronsRight />
                </Button>
            </div>
        </div>
    )
} 