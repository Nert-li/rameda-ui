import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type Offer } from "./columns"

interface OffersTableProps {
    data: Offer[]
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
    onOfferUpdated?: () => void
    onOfferDeleted?: () => void
}

export function OffersTable(props: OffersTableProps) {
    const offersTableConfig: DataTableConfig<Offer> = {
        getColumns: (onSort, sortingState) => getColumns(onSort, sortingState, {
            onOfferUpdated: props.onOfferUpdated,
            onOfferDeleted: props.onOfferDeleted,
        }),
        searchPlaceholder: "Filter by name..."
    }

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