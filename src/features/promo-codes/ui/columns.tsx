

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"
import { SortableHeader } from "@/shared/ui/data-grid"
import { PromoCodeActions } from "./promo-code-actions"

export type PromoCode = components["schemas"]["PromoCodeRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

interface ActionCallbacks {
    onPromoCodeUpdated?: () => void;
    onPromoCodeDeleted?: () => void;
}

export const getColumns = (
    onSort: SortFunction,
    sortingState: SortingState,
    callbacks?: ActionCallbacks
): ColumnDef<PromoCode>[] => [
        {
            accessorKey: "name",
            header: () => (
                <SortableHeader field="name" sorting={sortingState} onSort={onSort}>
                    Name
                </SortableHeader>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "discount_percent",
            header: () => (
                <SortableHeader field="discount_percent" sorting={sortingState} onSort={onSort}>
                    Discount
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("discount_percent"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "percent",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                }).format(amount / 100)

                return <div>{formatted}</div>
            },
        },
        {
            accessorKey: "offer",
            header: () => (
                <SortableHeader field="offer" sorting={sortingState} onSort={onSort}>
                    Offer
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const offer = row.original.offer
                return offer ? offer.name : <span className="text-muted-foreground">-</span>
            },
        },
        {
            accessorKey: "buyer",
            header: () => (
                <SortableHeader field="buyer" sorting={sortingState} onSort={onSort}>
                    Buyer
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const buyer = row.original.buyer
                return buyer ? (
                    <span className="font-medium">{buyer.email}</span>
                ) : (
                    <span className="text-muted-foreground">-</span>
                )
            },
        },
        {
            accessorKey: "country",
            header: () => (
                <SortableHeader field="country" sorting={sortingState} onSort={onSort}>
                    Country
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const country = row.original.country
                return country ? (
                    <span className="font-medium">{country}</span>
                ) : (
                    <span className="text-muted-foreground">-</span>
                )
            },
        },
        {
            accessorKey: "is_active",
            header: () => (
                <SortableHeader field="is_active" sorting={sortingState} onSort={onSort}>
                    Status
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const isActive = row.getValue("is_active")
                return isActive ? <Badge>Active</Badge> : <Badge variant="destructive">Inactive</Badge>
            },
        },
        {
            accessorKey: "expires_at",
            header: () => (
                <SortableHeader field="expires_at" sorting={sortingState} onSort={onSort}>
                    Expires At
                </SortableHeader>
            ),
            enableSorting: true,
            cell: ({ row }) => {
                const expiresAt = row.getValue("expires_at")
                if (!expiresAt) {
                    return <span className="text-muted-foreground">Never</span>
                }
                return new Date(expiresAt as string).toLocaleDateString()
            },
        },
        // Колонка действий
        {
            id: "actions",
            header: "Действия",
            cell: ({ row }) => {
                return (
                    <PromoCodeActions
                        promoCode={row.original}
                        onPromoCodeUpdated={callbacks?.onPromoCodeUpdated}
                        onPromoCodeDeleted={callbacks?.onPromoCodeDeleted}
                    />
                );
            },
        },
    ]