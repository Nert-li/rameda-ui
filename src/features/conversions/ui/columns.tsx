import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"
import { SortableHeader } from "@/shared/ui/sortable-header"

export type Conversion = components["schemas"]["ConversionRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Conversion>[] => [
    {
        accessorKey: "aasm_state",
        header: () => (
            <SortableHeader field="aasm_state" sorting={sortingState} onSort={onSort}>
                Status
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const status = row.getValue("aasm_state") as string;
            let variant: "default" | "secondary" | "destructive" = "secondary";
            if (["sell", "rebill"].includes(status)) {
                variant = "default";
            } else if (status === "cancel") {
                variant = "destructive";
            }
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "convertible_type",
        header: () => (
            <SortableHeader field="convertible_type" sorting={sortingState} onSort={onSort}>
                Type
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const type = row.getValue("convertible_type") as string;
            return <div>{type === "Click" ? "Click" : "Promo"}</div>
        },
    },
    {
        accessorKey: "click_subid",
        header: () => (
            <SortableHeader field="click_subid" sorting={sortingState} onSort={onSort}>
                Subid
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const conversion = row.original;
            if (conversion.convertible_type === "Click") {
                return <div>{conversion.click_subid || "-"}</div>
            } else {
                return <div>-</div>
            }
        },
    },
    {
        accessorKey: "promo_code_name",
        header: () => (
            <SortableHeader field="promo_code_name" sorting={sortingState} onSort={onSort}>
                Promo Code
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const conversion = row.original;
            if (conversion.convertible_type === "PromoCode") {
                return <div>{conversion.promo_code_name || "-"}</div>
            } else {
                return <div>-</div>
            }
        },
    },
    {
        accessorKey: "full_name",
        header: () => (
            <SortableHeader field="first_name" sorting={sortingState} onSort={onSort}>
                Name
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const firstName = row.original.first_name;
            const lastName = row.original.last_name;
            return <div>{`${firstName} ${lastName}`}</div>
        },
    },
    {
        accessorKey: "email",
        header: () => (
            <SortableHeader field="email" sorting={sortingState} onSort={onSort}>
                Email
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return <div className="truncate max-w-[200px]">{email}</div>
        },
    },
    {
        accessorKey: "phone",
        header: () => (
            <SortableHeader field="phone" sorting={sortingState} onSort={onSort}>
                Phone
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            return <div>{phone || "-"}</div>
        },
    },
    {
        accessorKey: "click_country",
        header: () => (
            <SortableHeader field="click_country" sorting={sortingState} onSort={onSort}>
                Country
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const country = row.getValue("click_country") as string;
            return <div>{country || "-"}</div>
        },
    },
    {
        accessorKey: "click_city",
        header: () => (
            <SortableHeader field="click_city" sorting={sortingState} onSort={onSort}>
                City
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const city = row.getValue("click_city") as string;
            return <div>{city || "-"}</div>
        },
    },
    {
        accessorKey: "buyer_id",
        header: () => (
            <SortableHeader field="buyer_id" sorting={sortingState} onSort={onSort}>
                Buyer ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const buyerId = row.getValue("buyer_id") as string;
            return <div className="font-mono text-sm">{buyerId || "-"}</div>
        },
    },
    {
        accessorKey: "offer_name",
        header: () => (
            <SortableHeader field="offer_name" sorting={sortingState} onSort={onSort}>
                Offer Name
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const offerName = row.getValue("offer_name") as string;
            return <div className="font-medium">{offerName || "-"}</div>
        },
    },
    {
        accessorKey: "cost",
        header: () => (
            <SortableHeader field="cost" sorting={sortingState} onSort={onSort}>
                Cost
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const cost = row.getValue("cost") as number;
            const numCost = Number(cost || 0);
            return <div className="font-mono text-green-600">${numCost.toFixed(2)}</div>
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
            const numRevenue = Number(revenue || 0);
            return <div>${numRevenue.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "click_ad_campaign_id",
        header: () => (
            <SortableHeader field="click_ad_campaign_id" sorting={sortingState} onSort={onSort}>
                Campaign ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const campaignId = row.getValue("click_ad_campaign_id") as string;
            return <div>{campaignId || "-"}</div>
        },
    },
    {
        accessorKey: "click_creative_id",
        header: () => (
            <SortableHeader field="click_creative_id" sorting={sortingState} onSort={onSort}>
                Creo ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const creoId = row.getValue("click_creative_id") as string;
            return <div>{creoId || "-"}</div>
        },
    },
    {
        accessorKey: "click_offer_type",
        header: () => (
            <SortableHeader field="click_offer_type" sorting={sortingState} onSort={onSort}>
                Offer Type
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const offerType = row.getValue("click_offer_type") as string;
            return <div>{offerType || "-"}</div>
        },
    },
    {
        accessorKey: "click_os",
        header: () => (
            <SortableHeader field="click_os" sorting={sortingState} onSort={onSort}>
                OS
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const os = row.getValue("click_os") as string;
            return <div>{os || "-"}</div>
        },
    },
    {
        accessorKey: "click_source",
        header: () => (
            <SortableHeader field="click_source" sorting={sortingState} onSort={onSort}>
                Source
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const source = row.getValue("click_source") as string;
            return <div>{source || "-"}</div>
        },
    },
    {
        accessorKey: "time_to_sell",
        header: () => (
            <SortableHeader field="time_to_sell" sorting={sortingState} onSort={onSort}>
                Time to Sell (h)
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const timeToSell = row.getValue("time_to_sell") as number;
            const numTimeToSell = Number(timeToSell);
            return <div>{timeToSell && !isNaN(numTimeToSell) ? `${numTimeToSell.toFixed(1)}h` : "-"}</div>
        },
    },
    {
        accessorKey: "time_to_rebill",
        header: () => (
            <SortableHeader field="time_to_rebill" sorting={sortingState} onSort={onSort}>
                Time to Rebill (h)
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const timeToRebill = row.getValue("time_to_rebill") as number;
            const numTimeToRebill = Number(timeToRebill);
            return <div>{timeToRebill && !isNaN(numTimeToRebill) ? `${numTimeToRebill.toFixed(1)}h` : "-"}</div>
        },
    },
    {
        accessorKey: "created_at",
        header: () => (
            <SortableHeader field="created_at" sorting={sortingState} onSort={onSort}>
                Created At
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const createdAt = row.getValue("created_at")
            return <div className="font-mono text-sm">{new Date(createdAt as string).toLocaleString()}</div>
        },
    },
];