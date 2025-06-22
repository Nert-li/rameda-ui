import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/shared/api/schema/generated";

type Report = components["schemas"]["ReportRecord"];

export const columns: ColumnDef<Report>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return id ? id.slice(0, 8) + "..." : "N/A";
        },
    },
    {
        accessorKey: "ads_manager_title",
        header: "Ads Manager",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("ads_manager_title")}</span>
        ),
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
            <span className="font-mono text-red-600">
                ${Number(row.getValue("spend") || 0).toFixed(2)}
            </span>
        ),
    },
    {
        accessorKey: "revenue",
        header: "Revenue",
        cell: ({ row }) => (
            <span className="font-mono text-green-600">
                ${Number(row.getValue("revenue") || 0).toFixed(2)}
            </span>
        ),
    },
    {
        accessorKey: "profit",
        header: "Profit",
        cell: ({ row }) => {
            const profit = Number(row.getValue("profit") || 0);
            return (
                <span className={`font-mono ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${profit.toFixed(2)}
                </span>
            );
        },
    },
    {
        accessorKey: "roi",
        header: "ROI",
        cell: ({ row }) => {
            const roi = Number(row.getValue("roi") || 0);
            return (
                <span className={`font-mono ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roi.toFixed(2)}%
                </span>
            );
        },
    },
    {
        accessorKey: "cr",
        header: "CR",
        cell: ({ row }) => (
            <span className="font-mono text-blue-600">
                {Number(row.getValue("cr") || 0).toFixed(2)}%
            </span>
        ),
    },
    {
        accessorKey: "cpm",
        header: "CPM",
        cell: ({ row }) => (
            <span className="font-mono text-purple-600">
                ${Number(row.getValue("cpm") || 0).toFixed(2)}
            </span>
        ),
    },
    {
        accessorKey: "ctr",
        header: "CTR",
        cell: ({ row }) => (
            <span className="font-mono text-orange-600">
                {Number(row.getValue("ctr") || 0).toFixed(2)}%
            </span>
        ),
    },
    {
        accessorKey: "cpc",
        header: "CPC",
        cell: ({ row }) => (
            <span className="font-mono text-indigo-600">
                ${Number(row.getValue("cpc") || 0).toFixed(2)}
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