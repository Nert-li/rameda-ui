import { usePromoCodesList } from "@/features/promo-codes/model/use-promo-codes-list";
import { PromoCodesTable } from "./ui/promo-codes-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {
    const { promoCodes, isLoading } = usePromoCodesList();

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-32" />
            </div>
        );
    }

    if (!promoCodes) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No promo codes found.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Promo Codes</h1>
            <PromoCodesTable columns={columns} data={promoCodes} />
        </div>
    );
} 