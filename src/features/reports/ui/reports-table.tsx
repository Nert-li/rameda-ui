import { UniversalDataTable } from "@/shared/ui/universal-data-table"
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
            pagination={pagination}
            searchPlaceholder="Filter conversions..."
        />
    )
} 