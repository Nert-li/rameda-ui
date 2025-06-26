import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type Click } from "./columns"

interface ClicksTableProps {
    data: Click[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function ClicksTable({
    data,
    sorting,
}: ClicksTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter clicks..."
        />
    )
} 