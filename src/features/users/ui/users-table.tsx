import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { type User } from "./columns"
import { getColumns } from "./columns"

const usersTableConfig: DataTableConfig<User> = {
    getColumns,
    searchPlaceholder: "Filter users..."
}

interface UsersTableProps {
    data: User[]
    sorting?: SortingProps
    pagination?: PaginationProps
}

export function UsersTable(props: UsersTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={usersTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
        />
    )
} 