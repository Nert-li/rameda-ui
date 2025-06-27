import { DataTableConfig, DataTableWrapper, type SortingProps, type PaginationProps } from "@/shared/ui/data-grid"
import { getColumns, type PromoCode } from "./columns"

const promoCodesTableConfig: DataTableConfig<PromoCode> = {
    getColumns,
    searchPlaceholder: "Filter promo codes..."
}
interface PromoCodesTableProps {
    data: PromoCode[]
    sorting?: SortingProps
    pagination?: PaginationProps
}

export function PromoCodesTable(props: PromoCodesTableProps) {
    return (
        <DataTableWrapper
            data={props.data}
            config={promoCodesTableConfig}
            sorting={props.sorting}
            pagination={props.pagination}
        />
    )
} 