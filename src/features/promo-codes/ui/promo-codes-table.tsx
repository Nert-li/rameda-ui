import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type PromoCode } from "./columns"

interface PromoCodesTableProps {
    data: PromoCode[]
    sorting?: SortingProps
    pagination?: PaginationProps
    isLoading?: boolean
    onPromoCodeUpdated?: () => void
    onPromoCodeDeleted?: () => void
}

export function PromoCodesTable(props: PromoCodesTableProps) {
    const promoCodesTableConfig: DataTableConfig<PromoCode> = {
        getColumns: (onSort, sortingState) => getColumns(onSort, sortingState, {
            onPromoCodeUpdated: props.onPromoCodeUpdated,
            onPromoCodeDeleted: props.onPromoCodeDeleted
        }),
        searchPlaceholder: "Filter promo codes..."
    }

    return (
        <DataTableWrapper
            data={props.data}
            config={promoCodesTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
            isLoading={props.isLoading}
        />
    )
} 