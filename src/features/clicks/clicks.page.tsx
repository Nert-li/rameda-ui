import { useClicksList } from "@/features/clicks/model/use-click";
import { ClicksTable } from "./ui/clicks-table";
import { Click } from "./ui/columns";

function ClickPage() {
    const { clicks, isLoading, sorting, pagination } = useClicksList();

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <ClicksTable
                data={clicks as Click[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
}

export const Component = ClickPage;
