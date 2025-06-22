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
        accessorKey: "click_subid",
        header: "SubID",
        cell: ({ row }) => {
            const subid = row.getValue("click_subid") as string;
            return <div>{subid || "-"}</div>
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
            return <div>{offerId || "-"}</div>
        },
    },
    {
        accessorKey: "cost",
        header: "Cost (Sell Price)",
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
        accessorKey: "revenue",
        header: "Revenue (Rebills)",
        cell: ({ row }) => {
            const revenue = row.getValue("revenue") as number || 0;
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(revenue)

            return <div className="font-medium text-green-600">{formatted}</div>
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
            let variant: "default" | "secondary" = "secondary";
            if (offerType === "clo") {
                variant = "default";
            }
            return <Badge variant={variant}>{offerType || "-"}</Badge>
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
            return <div>{timeToSell ? `${timeToSell}h` : "-"}</div>
        },
    },
    {
        accessorKey: "time_to_rebill",
        header: "Time to Rebill (h)",
        cell: ({ row }) => {
            const timeToRebill = row.getValue("time_to_rebill") as number;
            return <div>{timeToRebill ? `${timeToRebill}h` : "-"}</div>
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