import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type Report } from "./columns"

interface ReportsTableProps {
    data: Report[] | []
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function ReportsTable({
    data,
    sorting,
}: ReportsTableProps) {
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