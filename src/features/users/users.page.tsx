import { useUsersList } from "@/features/users/model/use-user";
import { UsersTable } from "./ui/users-table";
import { User } from "./ui/columns";

export function Component() {
    const { users, isLoading, sorting, pagination } = useUsersList();

    return (
        <UsersTable
            data={users as User[]}
            sorting={sorting}
            pagination={pagination}
            isLoading={isLoading}
        />
    );
}
