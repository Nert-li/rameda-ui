"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/shared/ui/kit/button"
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react"

export type Click = components["schemas"]["ClickRecord"]

export const columns: ColumnDef<Click>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
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
        accessorKey: "conversion_id",
        header: "Conversion ID",
    },
    {
        accessorKey: "ip",
        header: "IP",
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
    { accessorKey: "sub_id1", header: "sub_id1" },
    { accessorKey: "sub_id2", header: "sub_id2" },
    { accessorKey: "sub_id3", header: "sub_id3" },
    { accessorKey: "sub_id4", header: "sub_id4" },
    { accessorKey: "sub_id5", header: "sub_id5" },
    { accessorKey: "sub_id6", header: "sub_id6" },
    { accessorKey: "sub_id7", header: "sub_id7" },
    { accessorKey: "sub_id8", header: "sub_id8" },
    { accessorKey: "sub_id9", header: "sub_id9" },
    { accessorKey: "sub_id10", header: "sub_id10" },
    { accessorKey: "sub_id11", header: "sub_id11" },
    { accessorKey: "sub_id12", header: "sub_id12" },
    { accessorKey: "sub_id13", header: "sub_id13" },
    { accessorKey: "sub_id14", header: "sub_id14" },
    { accessorKey: "sub_id15", header: "sub_id15" },
] 