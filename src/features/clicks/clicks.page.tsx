import { useClicksList } from "@/features/clicks/model/use-click";
import { ClicksTable } from "./ui/clicks-table";
import { Click } from "./ui/columns";

export function Component() {
    const { clicks, isLoading, sorting, pagination } = useClicksList();

    return (
        <ClicksTable
            data={clicks as Click[]}
            sorting={sorting}
            pagination={pagination}
            isLoading={isLoading}
        />
    );
} 