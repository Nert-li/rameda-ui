import { ColumnDef } from "@tanstack/react-table"
import { UniversalDataTable } from "@/shared/ui/universal-data-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function UsersTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter by email or buyer name..."
        />
    )
} 