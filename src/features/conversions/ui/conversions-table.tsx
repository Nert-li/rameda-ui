import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type Conversion } from "./columns"

interface ConversionsTableProps {
    data: Conversion[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function ConversionsTable({
    data,
    sorting,
}: ConversionsTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter conversions..."
        />
    )
} 