import { useUsersList } from "@/features/users/model/use-users-list";
import { UsersTable } from "./ui/users-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function Component() {
    const { users, isLoading } = useUsersList();

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-32" />
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