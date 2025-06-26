import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type Offer } from "./columns"

interface OffersTableProps {
    data: Offer[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function OffersTable({
    data,
    sorting,
}: OffersTableProps) {
    // Создаем колонки с сортировкой если они переданы
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter by name..."
        />
    )
} 