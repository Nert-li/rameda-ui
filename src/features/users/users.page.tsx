import { useUsersListWithSorting } from "@/features/users/model/use-users-list";
import { UsersTable } from "./ui/users-table";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { usePagination } from "@/shared/lib/react/use-pagination";

export function Component() {
    // Простое использование пагинации - без сложных store
    const { page, limit, formatForUI } = usePagination(1, 25);

    const { users, isLoading, sorting, pagination } = useUsersListWithSorting({ page, limit });

    // Форматируем пагинацию для UI одной функцией
    const paginationForUI = formatForUI(pagination);

    if (isLoading) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Users</h1>
            </div>

            <UsersTable
                data={users}
                sorting={sorting}
                pagination={paginationForUI}
            />
        </div>
    );
}

