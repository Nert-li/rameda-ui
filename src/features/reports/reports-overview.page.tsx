import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReportsListWithSorting } from "./model/reports-list";
import { ReportsTable } from "./ui/reports-table";


export const Component = () => {
    const navigate = useNavigate();
    const { reports, stats, isLoading, isError, sorting } = useReportsListWithSorting();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading reports...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-medium">Error loading reports</p>
                    <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
                    <Button onClick={() => navigate("/ads-managers")} className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Ads Managers
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/ads-managers")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Ads Managers
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">All Reports</h1>
                        <p className="text-muted-foreground">
                            {/* {reports.length} reports across {stats?.ads_managers_count || 0} ads managers */}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        Total Spend: ${Number(stats?.total_spend || 0).toFixed(2)}
                    </Badge>
                    <Badge variant="secondary">
                        {/* This Month: ${Number(stats?.this_month_spend || 0).toFixed(2)} */}
                    </Badge>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ReportsTable
                    data={reports}
                    sorting={sorting}
                />
            </div>
        </div>
    );
}; 