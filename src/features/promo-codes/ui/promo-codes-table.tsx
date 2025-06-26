
import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type PromoCode } from "./columns"

interface PromoCodesTableProps {
    data: PromoCode[]
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

export function PromoCodesTable({
    data,
    sorting,
    pagination,
}: PromoCodesTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter promo codes..."
            pagination={pagination}
        />
    )
} 