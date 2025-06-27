import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, XCircle } from "lucide-react"
import { SortableHeader } from "@/shared/ui/data-grid"

export type Click = components["schemas"]["ClickRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Click>[] => [
    {
        accessorKey: "subid",
        header: () => (
            <SortableHeader field="subid" sorting={sortingState} onSort={onSort}>
                SubID
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "offer_id",
        header: () => (
            <SortableHeader field="offer_id" sorting={sortingState} onSort={onSort}>
                Offer ID
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "offer_name",
        header: () => (
            <SortableHeader field="offer_name" sorting={sortingState} onSort={onSort}>
                Offer
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "buyer_name",
        header: () => (
            <SortableHeader field="buyer_name" sorting={sortingState} onSort={onSort}>
                Buyer
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "ad_campaign_id",
        header: () => (
            <SortableHeader field="ad_campaign_id" sorting={sortingState} onSort={onSort}>
                Campaign ID
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "creative_id",
        header: () => (
            <SortableHeader field="creative_id" sorting={sortingState} onSort={onSort}>
                Creative ID
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "source",
        header: () => (
            <SortableHeader field="source" sorting={sortingState} onSort={onSort}>
                Source
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "os",
        header: () => (
            <SortableHeader field="os" sorting={sortingState} onSort={onSort}>
                OS
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "city",
        header: () => (
            <SortableHeader field="city" sorting={sortingState} onSort={onSort}>
                City
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "ip",
        header: () => (
            <SortableHeader field="ip" sorting={sortingState} onSort={onSort}>
                IP
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "conversion_id",
        header: () => (
            <SortableHeader field="conversion_id" sorting={sortingState} onSort={onSort}>
                Conversion ID
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "country",
        header: () => (
            <SortableHeader field="country" sorting={sortingState} onSort={onSort}>
                Country
            </SortableHeader>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "is_lead",
        header: "Lead",
        enableSorting: false,
        cell: ({ row }) => {
            const isLead = row.getValue("is_lead")
            return isLead ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_seal",
        header: "Seal",
        enableSorting: false,
        cell: ({ row }) => {
            const isSeal = row.getValue("is_seal")
            return isSeal ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_uniq",
        header: "Unique",
        enableSorting: false,
        cell: ({ row }) => {
            const isUniq = row.getValue("is_uniq")
            return isUniq ? "Yes" : "No"
        },
    },
    {
        accessorKey: "created_at",
        header: () => (
            <SortableHeader field="created_at" sorting={sortingState} onSort={onSort}>
                Date
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at")
            if (!createdAt) return <span className="text-muted-foreground">-</span>
            return <div className="font-mono text-sm">{new Date(createdAt as string).toLocaleString()}</div>
        },
    },
];