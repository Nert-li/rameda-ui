"use client"

import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"

export type Conversion = components["schemas"]["ConversionRecord"]

export const columns: ColumnDef<Conversion>[] = [
    {
        accessorKey: "aasm_state",
        header: "Status",
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
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("convertible_type") as string;
            return <div>{type === "Click" ? "Click" : "Promo"}</div>
        },
    },
    {
        accessorKey: "click_subid",
        header: "Subid",
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
        header: "Promo Code",
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
        header: "Name",
        cell: ({ row }) => {
            const firstName = row.original.first_name;
            const lastName = row.original.last_name;
            return <div>{`${firstName} ${lastName}`}</div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return <div className="truncate max-w-[200px]">{email}</div>
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            return <div>{phone || "-"}</div>
        },
    },
    {
        accessorKey: "click_country",
        header: "Country",
        cell: ({ row }) => {
            const country = row.getValue("click_country") as string;
            return <div>{country || "-"}</div>
        },
    },
    {
        accessorKey: "click_city",
        header: "City",
        cell: ({ row }) => {
            const city = row.getValue("click_city") as string;
            return <div>{city || "-"}</div>
        },
    },
    {
        accessorKey: "offer_id",
        header: "Offer ID",
        cell: ({ row }) => {
            const offerId = row.getValue("offer_id") as string;
            return <div className="font-mono text-sm">{offerId}</div>
        },
    },
    {
        accessorKey: "cost",
        header: "Cost (Sell Price)",
        cell: ({ row }) => {
            const cost = row.getValue("cost") as number;
            const numCost = Number(cost || 0);
            return <div>${numCost.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "revenue",
        header: "Revenue (Rebills Sum)",
        cell: ({ row }) => {
            const revenue = row.getValue("revenue") as number;
            const numRevenue = Number(revenue || 0);
            return <div>${numRevenue.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "click_ad_campaign_id",
        header: "Campaign ID",
        cell: ({ row }) => {
            const campaignId = row.getValue("click_ad_campaign_id") as string;
            return <div>{campaignId || "-"}</div>
        },
    },
    {
        accessorKey: "click_creative_id",
        header: "Creo ID",
        cell: ({ row }) => {
            const creoId = row.getValue("click_creative_id") as string;
            return <div>{creoId || "-"}</div>
        },
    },
    {
        accessorKey: "click_offer_type",
        header: "Offer Type",
        cell: ({ row }) => {
            const offerType = row.getValue("click_offer_type") as string;
            return <div>{offerType || "-"}</div>
        },
    },
    {
        accessorKey: "click_os",
        header: "OS",
        cell: ({ row }) => {
            const os = row.getValue("click_os") as string;
            return <div>{os || "-"}</div>
        },
    },
    {
        accessorKey: "click_source",
        header: "Source",
        cell: ({ row }) => {
            const source = row.getValue("click_source") as string;
            return <div>{source || "-"}</div>
        },
    },
    {
        accessorKey: "time_to_sell",
        header: "Time to Sell (h)",
        cell: ({ row }) => {
            const timeToSell = row.getValue("time_to_sell") as number;
            const numTimeToSell = Number(timeToSell);
            return <div>{timeToSell && !isNaN(numTimeToSell) ? `${numTimeToSell.toFixed(1)}h` : "-"}</div>
        },
    },
    {
        accessorKey: "time_to_rebill",
        header: "Time to Rebill (h)",
        cell: ({ row }) => {
            const timeToRebill = row.getValue("time_to_rebill") as number;
            const numTimeToRebill = Number(timeToRebill);
            return <div>{timeToRebill && !isNaN(numTimeToRebill) ? `${numTimeToRebill.toFixed(1)}h` : "-"}</div>
        },
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