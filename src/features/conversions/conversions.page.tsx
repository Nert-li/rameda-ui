import { useConversionsList } from "@/features/conversions/model/use-conversions-list";
import { ConversionsTable } from "./ui/conversions-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {
    const { conversions, isLoading } = useConversionsList();

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-32" />
            </div>
        );
    }

    if (!conversions) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No conversions found.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Conversions</h1>
            <ConversionsTable columns={columns} data={conversions} />
        </div>
    );
} 