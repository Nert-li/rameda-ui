import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type Offer } from "./columns"

interface OffersTableProps {
    data: Offer[]
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

export function OffersTable({
    data,
    sorting,
    pagination,
}: OffersTableProps) {
    // Создаем колонки с сортировкой если они переданы
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            pagination={pagination}
            searchPlaceholder="Filter by name..."
        />
    )
} 