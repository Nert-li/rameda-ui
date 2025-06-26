import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import { getColumns, type User } from "./columns"

interface UsersTableProps {
    data: User[]
    sorting?: {
        handleSort: (field: string) => void
        sorting: { field: string | null; direction: 'asc' | 'desc' }
    }
}

export function UsersTable({
    data,
    sorting,
}: UsersTableProps) {
    const columns = sorting
        ? getColumns(sorting.handleSort, sorting.sorting)
        : [];

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter users..."
        />
    )
} 