"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"

export type Offer = components["schemas"]["OfferRecord"]

export const columns: ColumnDef<Offer>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("name")}</span>
        ),
    },
    {
        accessorKey: "aasm_status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("aasm_status") as string;
            const variant = status === 'active' ? 'default' : 'secondary';
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "registrations_count",
        header: "Reg Count",
        cell: ({ row }) => {
            const count = row.getValue("registrations_count") as number;
            return <span className="font-mono">{count || 0}</span>
        },
    },
    {
        accessorKey: "first_deposits_count",
        header: "FD Count",
        cell: ({ row }) => {
            const count = row.getValue("first_deposits_count") as number;
            return <span className="font-mono">{count || 0}</span>
        },
    },
    {
        accessorKey: "first_deposits_sum",
        header: "FD Sum",
        cell: ({ row }) => {
            const sum = row.getValue("first_deposits_sum") as number;
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(sum || 0);
            return <span className="font-mono">{formatted}</span>
        },
    },
    {
        accessorKey: "revenue",
        header: "Revenue",
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
] 