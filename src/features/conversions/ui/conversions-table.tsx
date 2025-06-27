import { UniversalDataTable } from "@/shared/ui/data-grid"
import { getColumns, type Conversion } from "./columns"

interface ConversionsTableProps {
    data: Conversion[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
    pagination?: {
        currentPage: number
        totalPages: number
        totalCount: number
        pageSize: number
        onPageChange: (page: number) => void
        onPageSizeChange: (pageSize: number) => void
    }
}

export function ConversionsTable({
    data,
    sorting,
    pagination,
}: ConversionsTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter conversions..."
            pagination={pagination && {
                mode: 'server' as const,
                ...pagination
            }}
        />
    )
} 