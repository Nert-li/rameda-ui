import { useUsersListWithSorting } from "@/features/users/model/use-users-list";
import { UsersTable } from "./ui/users-table";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useState } from "react";

export function Component() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const { users, isLoading, sorting, pagination } = useUsersListWithSorting({ page, limit });

    const paginationForUI = pagination ? {
        currentPage: pagination.current_page,
        totalPages: pagination.total_pages,
        totalCount: pagination.total_count,
        pageSize: pagination.page_size,
        onPageChange: setPage,
        onPageSizeChange: (newLimit: number) => {
            setLimit(newLimit);
            setPage(1);
        }
    } : undefined;

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

    if (!users) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No users found.
            </div>
        );
    }

    return (
        <div className="p-2" >
            <UsersTable data={users} sorting={sorting} pagination={paginationForUI} />
        </div >
    );
}

