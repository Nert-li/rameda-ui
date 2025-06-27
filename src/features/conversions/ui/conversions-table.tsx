import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type Conversion } from "./columns"

const conversionsTableConfig: DataTableConfig<Conversion> = {
    getColumns,
    searchPlaceholder: "Filter conversions..."
}

interface ConversionsTableProps {
    data: Conversion[]
    sorting?: SortingProps
    pagination?: PaginationProps
}

export function ConversionsTable(props: ConversionsTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={conversionsTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
        />
    )
} 