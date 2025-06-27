import { useUsersList } from "@/features/users/model/use-users-list";
import { UsersTable } from "./ui/users-table";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { User } from "./ui/columns";

export function Component() {
    const { users, isLoading, sorting, pagination } = useUsersList();

    if (isLoading) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Users</h1>
            </div>

            <UsersTable
                data={users as User[]}
                sorting={sorting}
                pagination={pagination}
            />
        </div>
    );
}

