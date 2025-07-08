import { useUsersList } from "@/features/users/model/use-user";
import { UsersTable } from "./ui/users-table";
import { User } from "./ui/columns";

export function Component() {
    const { users, isLoading, sorting, pagination } = useUsersList();

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <UsersTable
                data={users as User[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
}
