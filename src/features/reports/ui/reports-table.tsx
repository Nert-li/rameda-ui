import { UniversalDataTable } from "@/shared/ui/data-grid"
import { getColumns, type Report } from "./columns"

interface ReportsTableProps {
    data: Report[] | []
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

export function ReportsTable({
    data,
    sorting,
    pagination,
}: ReportsTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            pagination={pagination && {
                mode: 'server' as const,
                ...pagination
            }}
            searchPlaceholder="Filter conversions..."
        />
    )
} 