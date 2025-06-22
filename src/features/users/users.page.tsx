import { useUsersList } from "@/features/users/model/use-users-list";
import { UsersTable } from "./ui/users-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {
    const { users, isLoading } = useUsersList();

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
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

    if (!users) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No users found.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <UsersTable columns={columns} data={users} />
        </div>
    );
} 