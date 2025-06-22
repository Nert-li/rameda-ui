import { UniversalDataTable } from "@/shared/ui/universal-data-table";
import { Badge } from "@/shared/ui/kit/badge";
import { Button } from "@/shared/ui/kit/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { rqClient } from "@/shared/api/instance";
import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/shared/api/schema/generated";

type Report = components["schemas"]["ReportRecord"];

const columns: ColumnDef<Report>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return id ? id.slice(0, 8) + "..." : "N/A";
        },
    },
    {
        accessorKey: "offer_name",
        header: "Offer",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("offer_name")}</span>
        ),
    },
    {
        accessorKey: "spend",
        header: "Spend",
        cell: ({ row }) => (
            <span className="font-mono text-green-600">
                ${Number(row.getValue("spend") || 0).toFixed(2)}
            </span>
        ),
    },
    {
        accessorKey: "report_date",
        header: "Date",
        cell: ({ row }) => {
            const date = row.getValue("report_date");
            return date ? new Date(date as string).toLocaleDateString() : "N/A";
        },
    },
    {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => {
            const date = row.getValue("created_at");
            return date ? new Date(date as string).toLocaleDateString() : "N/A";
        },
    },
];

function useReportsList(adsManagerId: string) {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/ads_managers/{adsManagerId}/reports", {
        params: { path: { adsManagerId } },
    });

    return {
        reports: data?.reports || [],
        isLoading,
        isError,
    };
}

function useAdsManagersList() {
    const { data } = rqClient.useQuery("get", "/ads_managers");
    return {
        adsManagers: data?.ads_managers || [],
    };
}

export const Component = () => {
    const navigate = useNavigate();
    const { adsManagerId } = useParams<{ adsManagerId: string }>();
    const { adsManagers } = useAdsManagersList();
    const { reports, isLoading, isError } = useReportsList(adsManagerId!);

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
                        Total Spend: ${reports.reduce((sum, report) => sum + Number(report.spend || 0), 0).toFixed(2)}
                    </Badge>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <UniversalDataTable
                    data={reports}
                    columns={columns}
                    searchPlaceholder="Filter reports..."
                    enableGlobalFilter={true}
                    enablePagination={true}
                    enableRowSelection={false}
                    className="h-full"
                />
            </div>
        </div>
    );
}; 