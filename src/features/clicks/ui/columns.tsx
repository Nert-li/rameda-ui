"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/shared/ui/kit/button"
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react"

export type Click = components["schemas"]["ClickRecord"]

export const columns: ColumnDef<Click>[] = [
    {
        accessorKey: "subid",
        header: "SubID",
    },
    {
        accessorKey: "offer_id",
        header: "Offer ID",
    },
    {
        accessorKey: "offer_name",
        header: "Offer",
    },
    {
        accessorKey: "buyer_name",
        header: "Buyer",
    },
    {
        accessorKey: "ad_campaign_id",
        header: "Campaign ID",
    },
    {
        accessorKey: "creative_id",
        header: "Creative ID",
    },
    {
        accessorKey: "source",
        header: "Source",
    },
    {
        accessorKey: "os",
        header: "OS",
    },
    {
        accessorKey: "country",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "ip",
        header: "IP",
    },
    {
        accessorKey: "conversion_id",
        header: "Conversion ID",
    },
    {
        accessorKey: "is_lead",
        header: "Lead",
        cell: ({ row }) => {
            const isLead = row.getValue("is_lead")
            return isLead ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_seal",
        header: "Seal",
        cell: ({ row }) => {
            const isSeal = row.getValue("is_seal")
            return isSeal ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_uniq",
        header: "Unique",
        cell: ({ row }) => {
            const isUniq = row.getValue("is_uniq")
            return isUniq ? "Yes" : "No"
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at")
            if (!createdAt) return <span className="text-muted-foreground">-</span>
            return new Date(createdAt as string).toLocaleString()
        },
    },
] 