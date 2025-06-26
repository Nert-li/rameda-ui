
import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type PromoCode } from "./columns"

interface PromoCodesTableProps {
    data: PromoCode[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function PromoCodesTable({
    data,
    sorting,
}: PromoCodesTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            searchPlaceholder="Filter promo codes..."
            data={data}
        />
    )
} 