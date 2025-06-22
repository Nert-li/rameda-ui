import { useClicksList } from "@/features/clicks/model/use-clicks-list";
import { ClicksTable } from "./ui/clicks-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {

    const { clicks, isLoading } = useClicksList();

    if (isLoading) {
        return (
            <div className="container mx-auto">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-1/4 rounded-lg" />

                    <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-1/3 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>

                    <div className="rounded-md border">
                        <div className="space-y-px p-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2">
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-24 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (!clicks) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No clicks found.
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <ClicksTable columns={columns} data={clicks} />
        </div>
    );
} 