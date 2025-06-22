"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"

export type Conversion = components["schemas"]["ConversionRecord"]

export const columns: ColumnDef<Conversion>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "aasm_state",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("aasm_state") as string;
            let variant: "default" | "secondary" | "destructive" = "secondary";
            if (["approved", "confirmed", "paid"].includes(status)) {
                variant = "default";
            } else if (["rejected", "cancelled"].includes(status)) {
                variant = "destructive";
            }
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("cost"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "convertible_type",
        header: "Type",
    },
    {
        accessorKey: "convertible_info",
        header: "Details",
        cell: ({ row }) => {
            const info = row.getValue("convertible_info") as any;
            if (!info) return "-";
            return (
                <div>
                    <div>{info.offer_name}</div>
                    <div className="text-xs text-muted-foreground">
                        {info.type === 'click' ? `SubID: ${info.subid}` : `Discount: ${info.discount_percent}%`}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at")
            return new Date(createdAt as string).toLocaleString()
        },
    },
] 