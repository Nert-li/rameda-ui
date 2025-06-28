import { usePromoCodesList } from "@/features/promo-codes/model/use-promo-codes-list";
import { PromoCodesTable } from "./ui/promo-codes-table";
import { PromoCode } from "./ui/columns";

export function Component() {
    const { promoCodes, isLoading, sorting, pagination } = usePromoCodesList();

    return (
        <div className="p-2" >
            <PromoCodesTable
                data={promoCodes as PromoCode[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div >
    );
} 