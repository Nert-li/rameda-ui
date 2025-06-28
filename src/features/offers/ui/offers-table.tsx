import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type Offer } from "./columns"

const offersTableConfig: DataTableConfig<Offer> = {
    getColumns,
    searchPlaceholder: "Filter by name..."
}

interface OffersTableProps {
    data: Offer[]
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
}

export function OffersTable(props: OffersTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={offersTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
            isLoading={props.isLoading}
        />
    )
} 