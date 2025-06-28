import { useOffersList } from "@/features/offers/model/use-offers-list";
import { OffersTable } from "./ui/offers-table";
import { Offer } from "./ui/columns";

export function Component() {
    const { offers, isLoading, sorting, pagination } = useOffersList();

    return (
        <div className="p-2">
            <OffersTable
                data={offers as Offer[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
} 