import { useConversionsList } from "@/features/conversions/model/use-conversion";
import { ConversionsTable } from "./ui/conversions-table";
import { Conversion } from "./ui/columns";

export function Component() {
    const { conversions, isLoading, sorting, pagination } = useConversionsList();

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <ConversionsTable
                data={conversions as Conversion[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
} 