"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"

export type Offer = components["schemas"]["OfferRecord"]

export const columns: ColumnDef<Offer>[] = [
    {
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "buyers_count",
        header: "Buyers",
    },
    {
        accessorKey: "clicks_count",
        header: "Clicks",
    },
    {
        accessorKey: "promo_codes_count",
        header: "Promo Codes",
    },
    {
        accessorKey: "active_promo_codes_count",
        header: "Active Promos",
    }
] 