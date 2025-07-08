import { useReportsList } from "./model/use-reports";
import { ReportsTable } from "./ui/reports-table";
import { Report } from "./ui/columns";

export const Component = () => {
    const { reports, isLoading, sorting, pagination } = useReportsList();

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <ReportsTable
                data={reports as Report[]}
                sorting={sorting}
                pagination={pagination}
                isLoading={isLoading}
            />
        </div>
    );
}; 