import { useConversionsList } from "@/features/conversions/model/use-conversion";
import { ConversionsTable } from "./ui/conversions-table";
import { Conversion } from "./ui/columns";

export function Component() {
    const { conversions, isLoading, sorting, pagination } = useConversionsList();

    return (
        <ConversionsTable
            data={conversions as Conversion[]}
            sorting={sorting}
            pagination={pagination}
            isLoading={isLoading}
        />
    );
} 