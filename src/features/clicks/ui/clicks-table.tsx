import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type Click } from "./columns"

const clicksTableConfig: DataTableConfig<Click> = {
    getColumns,
    searchPlaceholder: "Filter clicks..."
}

interface ClicksTableProps {
    data: Click[]
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
}

export function ClicksTable(props: ClicksTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={clicksTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
            isLoading={props.isLoading}
        />
    )
} 