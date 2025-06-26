import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdsManagersListWithSorting } from "@/features/ads-managers";
import { useReportsListWithSorting } from "./model/reports-list";
import { ReportsTable } from "./ui/reports-table";

export const Component = () => {
    const navigate = useNavigate();
    const { adsManagerId } = useParams<{ adsManagerId: string }>();

    const { adsManagers } = useAdsManagersListWithSorting();
    const { reports, isLoading, isError, sorting } = useReportsListWithSorting();
    const adsManager = adsManagers.find(am => am.id === adsManagerId);

    if (!adsManagerId) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-medium">Invalid ads manager ID</p>
                    <Button onClick={() => navigate("/ads-managers")} className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Ads Managers
                    </Button>
                </div>
            </div>
        );
    }

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
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Reports</h1>
                        {adsManager && (
                            <p className="text-muted-foreground">
                                {adsManager.title} • {reports.length} reports
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        {/* Total Spend: ${stats?.total_spend?.toFixed(2) || '0.00'} */}
                    </Badge>
                    <Badge variant="outline">
                        {/* Total Revenue: ${stats?.total_revenue?.toFixed(2) || '0.00'} */}
                    </Badge>
                    <Badge variant="outline">
                        {/* Total Profit: ${stats?.total_profit?.toFixed(2) || '0.00'} */}
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