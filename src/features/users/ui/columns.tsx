"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/shared/ui/kit/button"
import { ArrowUpDown } from "lucide-react"

export type User = components["schemas"]["UserRecord"]

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "buyer_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Buyer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const buyerName = row.getValue("buyer_name")
            return buyerName ? buyerName : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "offers_count",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Offers
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const offersCount = row.getValue("offers_count")
            return typeof offersCount === "number" ? (
                offersCount
            ) : (
                <span className="text-muted-foreground">-</span>
            )
        },
    },
] 