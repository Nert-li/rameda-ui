import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, XCircle } from "lucide-react"
import { SortableHeader } from "@/shared/ui/data-grid"

export type Click = components["schemas"]["ClickRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Click>[] => [
    {
        accessorKey: "click_id",
        header: () => (
            <SortableHeader field="click_id" sorting={sortingState} onSort={onSort}>
                Click ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("click_id")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "datetime",
        header: () => (
            <SortableHeader field="datetime" sorting={sortingState} onSort={onSort}>
                Date & Time
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("datetime")
            return value ? <div className="font-mono text-sm">{new Date(value as string).toLocaleString()}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "campaign",
        header: () => (
            <SortableHeader field="campaign" sorting={sortingState} onSort={onSort}>
                Campaign
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("campaign")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "campaign_group",
        header: () => (
            <SortableHeader field="campaign_group" sorting={sortingState} onSort={onSort}>
                Campaign Group
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("campaign_group")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
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
            const value = row.getValue("offer")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "stream",
        header: () => (
            <SortableHeader field="stream" sorting={sortingState} onSort={onSort}>
                Stream
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("stream")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "ip",
        header: () => (
            <SortableHeader field="ip" sorting={sortingState} onSort={onSort}>
                IP
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("ip")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
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
            const value = row.getValue("country")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "country_code",
        header: () => (
            <SortableHeader field="country_code" sorting={sortingState} onSort={onSort}>
                Country Code
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("country_code")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "region",
        header: () => (
            <SortableHeader field="region" sorting={sortingState} onSort={onSort}>
                Region
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("region")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "city",
        header: () => (
            <SortableHeader field="city" sorting={sortingState} onSort={onSort}>
                City
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("city")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "device_type",
        header: () => (
            <SortableHeader field="device_type" sorting={sortingState} onSort={onSort}>
                Device Type
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("device_type")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "device_model",
        header: () => (
            <SortableHeader field="device_model" sorting={sortingState} onSort={onSort}>
                Device Model
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("device_model")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "os",
        header: () => (
            <SortableHeader field="os" sorting={sortingState} onSort={onSort}>
                OS
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("os")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "os_version",
        header: () => (
            <SortableHeader field="os_version" sorting={sortingState} onSort={onSort}>
                OS Version
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("os_version")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "browser",
        header: () => (
            <SortableHeader field="browser" sorting={sortingState} onSort={onSort}>
                Browser
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("browser")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "browser_version",
        header: () => (
            <SortableHeader field="browser_version" sorting={sortingState} onSort={onSort}>
                Browser Version
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("browser_version")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "user_agent",
        header: () => (
            <SortableHeader field="user_agent" sorting={sortingState} onSort={onSort}>
                User Agent
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("user_agent")
            return value ? <div className="max-w-[200px] truncate" title={value as string}>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "connection_type",
        header: () => (
            <SortableHeader field="connection_type" sorting={sortingState} onSort={onSort}>
                Connection Type
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("connection_type")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "language",
        header: () => (
            <SortableHeader field="language" sorting={sortingState} onSort={onSort}>
                Language
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("language")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "isp",
        header: () => (
            <SortableHeader field="isp" sorting={sortingState} onSort={onSort}>
                ISP
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("isp")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "operator",
        header: () => (
            <SortableHeader field="operator" sorting={sortingState} onSort={onSort}>
                Operator
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("operator")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "is_bot",
        header: "Bot",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_bot")
            return value ? <CheckCircle className="h-4 w-4 text-red-500" /> : <XCircle className="h-4 w-4 text-green-500" />
        },
    },
    {
        accessorKey: "is_lead",
        header: "Lead",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_lead")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_sale",
        header: "Sale",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_sale")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_reg",
        header: "Registration",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_reg")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_rejected",
        header: "Rejected",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_rejected")
            return value ? <CheckCircle className="h-4 w-4 text-red-500" /> : <XCircle className="h-4 w-4 text-green-500" />
        },
    },
    {
        accessorKey: "is_unique_campaign",
        header: "Unique Campaign",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_unique_campaign")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_unique_global",
        header: "Unique Global",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_unique_global")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_unique_stream",
        header: "Unique Stream",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_unique_stream")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "landing_clicked",
        header: "Landing Clicked",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("landing_clicked")
            return value ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
        },
    },
    {
        accessorKey: "is_using_proxy",
        header: "Using Proxy",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_using_proxy")
            return value ? <CheckCircle className="h-4 w-4 text-orange-500" /> : <XCircle className="h-4 w-4 text-green-500" />
        },
    },
    {
        accessorKey: "is_empty_referrer",
        header: "Empty Referrer",
        enableSorting: false,
        cell: ({ row }) => {
            const value = row.getValue("is_empty_referrer")
            return value ? <CheckCircle className="h-4 w-4 text-orange-500" /> : <XCircle className="h-4 w-4 text-green-500" />
        },
    },
    {
        accessorKey: "sub_id",
        header: () => (
            <SortableHeader field="sub_id" sorting={sortingState} onSort={onSort}>
                Sub ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("sub_id")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "external_id",
        header: () => (
            <SortableHeader field="external_id" sorting={sortingState} onSort={onSort}>
                External ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("external_id")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "referrer",
        header: () => (
            <SortableHeader field="referrer" sorting={sortingState} onSort={onSort}>
                Referrer
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("referrer")
            return value ? <div className="max-w-[200px] truncate" title={value as string}>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "destination",
        header: () => (
            <SortableHeader field="destination" sorting={sortingState} onSort={onSort}>
                Destination
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("destination")
            return value ? <div className="max-w-[200px] truncate" title={value as string}>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "source",
        header: () => (
            <SortableHeader field="source" sorting={sortingState} onSort={onSort}>
                Source
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("source")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "ts",
        header: () => (
            <SortableHeader field="ts" sorting={sortingState} onSort={onSort}>
                Traffic Source
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("ts")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "creative_id",
        header: () => (
            <SortableHeader field="creative_id" sorting={sortingState} onSort={onSort}>
                Creative ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("creative_id")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "ad_campaign_id",
        header: () => (
            <SortableHeader field="ad_campaign_id" sorting={sortingState} onSort={onSort}>
                Ad Campaign ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("ad_campaign_id")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "visitor_code",
        header: () => (
            <SortableHeader field="visitor_code" sorting={sortingState} onSort={onSort}>
                Visitor Code
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("visitor_code")
            return value ? <div className="font-mono text-xs">{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "keyword",
        header: () => (
            <SortableHeader field="keyword" sorting={sortingState} onSort={onSort}>
                Keyword
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("keyword")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "search_engine",
        header: () => (
            <SortableHeader field="search_engine" sorting={sortingState} onSort={onSort}>
                Search Engine
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("search_engine")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
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
            const value = row.getValue("revenue")
            return value ? <div className="font-mono text-green-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
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
            const value = row.getValue("cost")
            return value ? <div className="font-mono text-red-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "profit",
        header: () => (
            <SortableHeader field="profit" sorting={sortingState} onSort={onSort}>
                Profit
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("profit")
            if (!value) return <span className="text-muted-foreground">-</span>
            const profit = Number(value)
            return <div className={`font-mono ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>${profit.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "sale_revenue",
        header: () => (
            <SortableHeader field="sale_revenue" sorting={sortingState} onSort={onSort}>
                Sale Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("sale_revenue")
            return value ? <div className="font-mono text-green-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "lead_revenue",
        header: () => (
            <SortableHeader field="lead_revenue" sorting={sortingState} onSort={onSort}>
                Lead Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("lead_revenue")
            return value ? <div className="font-mono text-green-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "reg_revenue",
        header: () => (
            <SortableHeader field="reg_revenue" sorting={sortingState} onSort={onSort}>
                Registration Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("reg_revenue")
            return value ? <div className="font-mono text-green-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "deposit_revenue",
        header: () => (
            <SortableHeader field="deposit_revenue" sorting={sortingState} onSort={onSort}>
                Deposit Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("deposit_revenue")
            return value ? <div className="font-mono text-green-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "rejected_revenue",
        header: () => (
            <SortableHeader field="rejected_revenue" sorting={sortingState} onSort={onSort}>
                Rejected Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("rejected_revenue")
            return value ? <div className="font-mono text-red-600">${Number(value).toFixed(2)}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "profitability",
        header: () => (
            <SortableHeader field="profitability" sorting={sortingState} onSort={onSort}>
                Profitability %
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("profitability")
            if (!value) return <span className="text-muted-foreground">-</span>
            const profitability = Number(value)
            return <div className={`font-mono ${profitability >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profitability.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "rebills",
        header: () => (
            <SortableHeader field="rebills" sorting={sortingState} onSort={onSort}>
                Rebills
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("rebills")
            return value ? <div className="font-mono">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "deposits",
        header: () => (
            <SortableHeader field="deposits" sorting={sortingState} onSort={onSort}>
                Deposits
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("deposits")
            return value ? <div className="font-mono">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "landing_clicked_period",
        header: () => (
            <SortableHeader field="landing_clicked_period" sorting={sortingState} onSort={onSort}>
                Landing Click Period
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("landing_clicked_period")
            return value ? <div className="font-mono">{value as number}s</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "stream_id",
        header: () => (
            <SortableHeader field="stream_id" sorting={sortingState} onSort={onSort}>
                Stream ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("stream_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "ts_id",
        header: () => (
            <SortableHeader field="ts_id" sorting={sortingState} onSort={onSort}>
                TS ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("ts_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "affiliate_network_id",
        header: () => (
            <SortableHeader field="affiliate_network_id" sorting={sortingState} onSort={onSort}>
                Affiliate Network ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("affiliate_network_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "offer_id",
        header: () => (
            <SortableHeader field="offer_id" sorting={sortingState} onSort={onSort}>
                Offer ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("offer_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "landing_id",
        header: () => (
            <SortableHeader field="landing_id" sorting={sortingState} onSort={onSort}>
                Landing ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("landing_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "campaign_id",
        header: () => (
            <SortableHeader field="campaign_id" sorting={sortingState} onSort={onSort}>
                Campaign ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("campaign_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "parent_campaign_id",
        header: () => (
            <SortableHeader field="parent_campaign_id" sorting={sortingState} onSort={onSort}>
                Parent Campaign ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("parent_campaign_id")
            return value ? <div className="font-mono text-xs">{value as number}</div> : <span className="text-muted-foreground">-</span>
        },
    },
    {
        accessorKey: "affiliate_network",
        header: () => (
            <SortableHeader field="affiliate_network" sorting={sortingState} onSort={onSort}>
                Affiliate Network
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("affiliate_network")
            return value ? <div>{value as string}</div> : <span className="text-muted-foreground">-</span>
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
            const value = row.getValue("created_at")
            if (!value) return <span className="text-muted-foreground">-</span>
            return <div className="font-mono text-sm">{new Date(value as string).toLocaleString()}</div>
        },
    },
    {
        accessorKey: "updated_at",
        header: () => (
            <SortableHeader field="updated_at" sorting={sortingState} onSort={onSort}>
                Updated At
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const value = row.getValue("updated_at")
            if (!value) return <span className="text-muted-foreground">-</span>
            return <div className="font-mono text-sm">{new Date(value as string).toLocaleString()}</div>
        },
    },
];