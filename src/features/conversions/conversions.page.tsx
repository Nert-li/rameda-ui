import { useConversionsList } from "@/features/conversions/model/use-conversions-list";
import { ConversionsTable } from "./ui/conversions-table";
import { Conversion } from "./ui/columns";

export function Component() {
    const { conversions, isLoading, sorting, pagination } = useConversionsList();

    return (
        <div className="p-2">
            <ConversionsTable
                data={conversions as Conversion[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
} 