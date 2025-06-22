"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/shared/ui/kit/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/shared/ui/kit/badge"

export type PromoCode = components["schemas"]["PromoCodeRecord"]

export const columns: ColumnDef<PromoCode>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "discount_percent",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Discount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("discount_percent"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }).format(amount / 100)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "offer",
        header: "Offer",
        cell: ({ row }) => {
            const offer = row.original.offer
            return offer ? offer.name : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("is_active")
            return isActive ? <Badge>Active</Badge> : <Badge variant="destructive">Inactive</Badge>
        },
    },
    {
        accessorKey: "expires_at",
        header: "Expires At",
        cell: ({ row }) => {
            const expiresAt = row.getValue("expires_at")
            if (!expiresAt) {
                return <span className="text-muted-foreground">Never</span>
            }
            return new Date(expiresAt as string).toLocaleDateString()
        },
    },
    {
        accessorKey: "conversions_count",
        header: "Conversions",
    },
] 