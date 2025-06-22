import { useOffersList } from "@/features/offers/model/use-offers-list";
import { OffersTable } from "./ui/offers-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {
    const { offers, isLoading } = useOffersList();

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-32" />
            </div>
        );
    }

    if (!offers) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No offers found.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Offers</h1>
            <OffersTable columns={columns} data={offers} />
        </div>
    );
} 