

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"
import { SortableHeader } from "@/shared/ui/sortable-header"

export type Offer = components["schemas"]["OfferRecord"]

// Тип для функции сортировки
type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Offer>[] => [
    {
        accessorKey: "name",
        header: () => (
            <SortableHeader field="name" sorting={sortingState} onSort={onSort}>
                Name
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("name")}</span>
        ),
    },
    {
        accessorKey: "aasm_status",
        header: () => (
            <SortableHeader field="aasm_status" sorting={sortingState} onSort={onSort}>
                Status
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const status = row.getValue("aasm_status") as string;
            const variant = status === 'active' ? 'default' : 'secondary';
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "registrations_count",
        header: () => (
            <SortableHeader field="registrations_count" sorting={sortingState} onSort={onSort}>
                Reg Count
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const count = row.getValue("registrations_count") as number;
            return <span className="font-mono">{count || 0}</span>
        },
    },
    {
        accessorKey: "revenue",
        header: () => (
            <SortableHeader field="revenue" sorting={sortingState} onSort={onSort}>
                Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const revenue = row.getValue("revenue") as number;
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(revenue || 0);
            return <span className="font-mono font-medium text-green-600">{formatted}</span>
        },
    },
    {
        accessorKey: "clicks_count",
        header: "Clicks",
        cell: ({ row }) => {
            const count = row.getValue("clicks_count") as number;
            return <span className="font-mono">{count || 0}</span>
        },
    },
    {
        accessorKey: "promo_codes_count",
        header: "Promo Codes",
        cell: ({ row }) => {
            const count = row.getValue("promo_codes_count") as number;
            return <span className="font-mono">{count || 0}</span>
        },
    },
    {
        accessorKey: "spend",
        header: "Spend",
        cell: ({ row }) => {
            const spend = row.getValue("spend") as number;
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(spend || 0);
            return <span className="font-mono text-red-600">{formatted}</span>
        },
    },
    {
        accessorKey: "roi",
        header: "ROI",
        cell: ({ row }) => {
            const revenue = row.getValue("revenue") as number || 0;
            const spend = row.getValue("spend") as number || 0;

            if (spend === 0) {
                return <span className="text-muted-foreground">-</span>
            }

            const roi = ((revenue - spend) / spend) * 100;
            const formatted = `${roi.toFixed(1)}%`;
            const color = roi >= 0 ? "text-green-600" : "text-red-600";

            return <span className={`font-mono font-medium ${color}`}>{formatted}</span>
        },
    },
];