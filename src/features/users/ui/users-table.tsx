import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type User } from "./columns"

interface UsersTableProps {
    data: User[]
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

export function UsersTable({
    data,
    sorting,
    pagination,
}: UsersTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            pagination={pagination}
            searchPlaceholder="Filter users..."
        />
    )
} 