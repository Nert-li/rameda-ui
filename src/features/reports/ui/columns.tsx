import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/shared/api/schema/generated";
import { SortableHeader } from "@/shared/ui/data-grid";

export type Report = components["schemas"]["ReportRecord"];

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Report>[] => [
    {
        accessorKey: "id",
        header: () => (
            <SortableHeader field="id" sorting={sortingState} onSort={onSort}>
                ID
            </SortableHeader>
        ),
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return id ? id.slice(0, 8) + "..." : "N/A";
        },
        enableSorting: false,
    },
    {
        accessorKey: "ads_manager_title",
        header: () => (
            <SortableHeader field="ads_manager_title" sorting={sortingState} onSort={onSort}>
                Ads Manager
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("ads_manager_title")}</span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "offer_name",
        header: () => (
            <SortableHeader field="offer_name" sorting={sortingState} onSort={onSort}>
                Offer
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("offer_name")}</span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "spend",
        header: () => (
            <SortableHeader field="spend" sorting={sortingState} onSort={onSort}>
                Spend
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-red-600">
                ${Number(row.getValue("spend") || 0).toFixed(2)}
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "revenue",
        header: () => (
            <SortableHeader field="revenue" sorting={sortingState} onSort={onSort}>
                Revenue
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-green-600">
                ${Number(row.getValue("revenue") || 0).toFixed(2)}
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "profit",
        header: () => (
            <SortableHeader field="profit" sorting={sortingState} onSort={onSort}>
                Profit
            </SortableHeader>
        ),
        cell: ({ row }) => {
            const profit = Number(row.getValue("profit") || 0);
            return (
                <span className={`font-mono ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${profit.toFixed(2)}
                </span>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "roi",
        header: () => (
            <SortableHeader field="roi" sorting={sortingState} onSort={onSort}>
                ROI
            </SortableHeader>
        ),
        cell: ({ row }) => {
            const roi = Number(row.getValue("roi") || 0);
            return (
                <span className={`font-mono ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roi.toFixed(2)}%
                </span>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: "cr",
        header: () => (
            <SortableHeader field="cr" sorting={sortingState} onSort={onSort}>
                CR
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-blue-600">
                {Number(row.getValue("cr") || 0).toFixed(2)}%
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "cpm",
        header: () => (
            <SortableHeader field="cpm" sorting={sortingState} onSort={onSort}>
                CPM
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-purple-600">
                ${Number(row.getValue("cpm") || 0).toFixed(2)}
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "ctr",
        header: () => (
            <SortableHeader field="ctr" sorting={sortingState} onSort={onSort}>
                CTR
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-orange-600">
                {Number(row.getValue("ctr") || 0).toFixed(2)}%
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "cpc",
        header: () => (
            <SortableHeader field="cpc" sorting={sortingState} onSort={onSort}>
                CPC
            </SortableHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-indigo-600">
                ${Number(row.getValue("cpc") || 0).toFixed(2)}
            </span>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "report_date",
        header: () => (
            <SortableHeader field="report_date" sorting={sortingState} onSort={onSort}>
                Date
            </SortableHeader>
        ),
        cell: ({ row }) => {
            const date = row.getValue("report_date");
            return date ? new Date(date as string).toLocaleDateString() : "N/A";
        },
        enableSorting: false,
    },
    {
        accessorKey: "created_at",
        header: () => (
            <SortableHeader field="created_at" sorting={sortingState} onSort={onSort}>
                Created
            </SortableHeader>
        ),
        cell: ({ row }) => {
            const date = row.getValue("created_at");
            return date ? new Date(date as string).toLocaleDateString() : "N/A";
        },
        enableSorting: false,
    },
];