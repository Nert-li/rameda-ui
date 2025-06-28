import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type Report } from "./columns"

const reportsTableConfig: DataTableConfig<Report> = {
    getColumns,
    searchPlaceholder: "Filter reports..."
}

interface ReportsTableProps {
    data: Report[] | []
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
}

export function ReportsTable(props: ReportsTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={reportsTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
            isLoading={props.isLoading}
        />
    )
} 