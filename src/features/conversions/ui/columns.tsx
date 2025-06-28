import { components } from "@/shared/api/schema/generated"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/ui/kit/badge"
import { SortableHeader } from "@/shared/ui/data-grid"

export type Conversion = components["schemas"]["ConversionRecord"]

type SortFunction = (field: string) => void;
type SortingState = { field: string | null; direction: 'asc' | 'desc' };

export const getColumns = (onSort: SortFunction, sortingState: SortingState): ColumnDef<Conversion>[] => [
    {
        accessorKey: "conversion_id",
        header: () => (
            <SortableHeader field="conversion_id" sorting={sortingState} onSort={onSort}>
                Conversion ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const conversionId = row.getValue("conversion_id") as string;
            return <div className="font-mono text-sm text-gray-600">{conversionId?.slice(0, 8)}...</div>
        },
    },
    {
        accessorKey: "status",
        header: () => (
            <SortableHeader field="status" sorting={sortingState} onSort={onSort}>
                Status
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusColor = row.original.status_color;

            let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
            switch (status) {
                case "approved":
                    variant = "default";
                    break;
                case "pending":
                    variant = "outline";
                    break;
                case "rejected":
                    variant = "destructive";
                    break;
                case "trash":
                    variant = "secondary";
                    break;
                case "hold":
                    variant = "outline";
                    break;
            }

            return (
                <Badge variant={variant} className={`bg-${statusColor}-100 text-${statusColor}-800 border-${statusColor}-200`}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "click_info.campaign",
        header: () => (
            <SortableHeader field="campaign" sorting={sortingState} onSort={onSort}>
                Campaign
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const campaign = row.original.click_info?.campaign;
            return <div className="font-medium">{campaign || "-"}</div>
        },
    },
    {
        accessorKey: "click_info.offer",
        header: () => (
            <SortableHeader field="offer" sorting={sortingState} onSort={onSort}>
                Offer
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const offer = row.original.click_info?.offer;
            return <div className="font-medium">{offer || "-"}</div>
        },
    },
    {
        accessorKey: "click_info.sub_id",
        header: () => (
            <SortableHeader field="sub_id" sorting={sortingState} onSort={onSort}>
                Sub ID
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const subId = row.original.click_info?.sub_id;
            return <div className="font-mono text-sm">{subId || "-"}</div>
        },
    },
    {
        accessorKey: "click_info.country",
        header: () => (
            <SortableHeader field="country" sorting={sortingState} onSort={onSort}>
                Country
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const country = row.original.click_info?.country;
            const countryCode = row.original.click_info?.country_code;
            return (
                <div className="flex items-center space-x-2">
                    {countryCode && <span className="text-xs">{countryCode}</span>}
                    <span>{country || "-"}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.city",
        header: () => (
            <SortableHeader field="city" sorting={sortingState} onSort={onSort}>
                City
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const city = row.original.click_info?.city;
            return <div>{city || "-"}</div>
        },
    },
    {
        accessorKey: "click_info.ip",
        header: () => (
            <SortableHeader field="ip" sorting={sortingState} onSort={onSort}>
                IP Address
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const ip = row.original.click_info?.ip;
            return <div className="font-mono text-sm">{ip || "-"}</div>
        },
    },
    {
        accessorKey: "click_info.device_type",
        header: () => (
            <SortableHeader field="device_type" sorting={sortingState} onSort={onSort}>
                Device
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const deviceType = row.original.click_info?.device_type;
            const os = row.original.click_info?.os;
            return (
                <div className="text-sm">
                    <div className="font-medium">{deviceType || "Unknown"}</div>
                    {os && <div className="text-gray-500">{os}</div>}
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.browser",
        header: () => (
            <SortableHeader field="browser" sorting={sortingState} onSort={onSort}>
                Browser
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const browser = row.original.click_info?.browser;
            const browserVersion = row.original.click_info?.browser_version;
            return (
                <div className="text-sm">
                    <div className="font-medium">{browser || "Unknown"}</div>
                    {browserVersion && <div className="text-gray-500">{browserVersion}</div>}
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.revenue",
        header: () => (
            <SortableHeader field="revenue" sorting={sortingState} onSort={onSort}>
                Revenue
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const revenue = row.original.click_info?.revenue;
            const numRevenue = Number(revenue || 0);
            return (
                <div className={`font-mono text-sm ${numRevenue > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    ${numRevenue.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.cost",
        header: () => (
            <SortableHeader field="cost" sorting={sortingState} onSort={onSort}>
                Cost
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const cost = row.original.click_info?.cost;
            const numCost = Number(cost || 0);
            return (
                <div className={`font-mono text-sm ${numCost > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                    ${numCost.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.profit",
        header: () => (
            <SortableHeader field="profit" sorting={sortingState} onSort={onSort}>
                Profit
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const profit = row.original.click_info?.profit;
            const numProfit = Number(profit || 0);
            const isPositive = numProfit > 0;
            return (
                <div className={`font-mono text-sm font-medium ${isPositive ? 'text-green-600' : numProfit < 0 ? 'text-red-600' : 'text-gray-400'
                    }`}>
                    ${numProfit.toFixed(2)}
                </div>
            );
        },
    },
    {
        accessorKey: "sale_period_formatted",
        header: () => (
            <SortableHeader field="sale_period" sorting={sortingState} onSort={onSort}>
                Sale Period
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const salePeriodFormatted = row.getValue("sale_period_formatted") as string;
            const salePeriod = row.original.sale_period;

            if (!salePeriod) return <div className="text-gray-400">-</div>;

            // Цветовое кодирование по скорости конверсии
            let colorClass = "text-gray-600";
            if (salePeriod <= 300) colorClass = "text-green-600"; // Быстрая конверсия (до 5 минут)
            else if (salePeriod <= 3600) colorClass = "text-blue-600"; // Нормальная (до часа)
            else if (salePeriod <= 86400) colorClass = "text-orange-600"; // Медленная (до дня)
            else colorClass = "text-red-600"; // Очень медленная

            return <div className={`font-mono text-sm ${colorClass}`}>{salePeriodFormatted}</div>;
        },
    },
    {
        accessorKey: "postback_datetime",
        header: () => (
            <SortableHeader field="postback_datetime" sorting={sortingState} onSort={onSort}>
                Postback Time
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const postbackDatetime = row.getValue("postback_datetime") as string;
            if (!postbackDatetime) return <div>-</div>;

            const date = new Date(postbackDatetime);
            return (
                <div className="text-sm">
                    <div>{date.toLocaleDateString()}</div>
                    <div className="text-gray-500">{date.toLocaleTimeString()}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "click_datetime",
        header: () => (
            <SortableHeader field="click_datetime" sorting={sortingState} onSort={onSort}>
                Click Time
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const clickDatetime = row.getValue("click_datetime") as string;
            if (!clickDatetime) return <div>-</div>;

            const date = new Date(clickDatetime);
            return (
                <div className="text-sm">
                    <div>{date.toLocaleDateString()}</div>
                    <div className="text-gray-500">{date.toLocaleTimeString()}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "sale_datetime",
        header: () => (
            <SortableHeader field="sale_datetime" sorting={sortingState} onSort={onSort}>
                Sale Time
            </SortableHeader>
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const saleDatetime = row.getValue("sale_datetime") as string;
            if (!saleDatetime) return <div className="text-gray-400">-</div>;

            const date = new Date(saleDatetime);
            return (
                <div className="text-sm">
                    <div>{date.toLocaleDateString()}</div>
                    <div className="text-gray-500">{date.toLocaleTimeString()}</div>
                </div>
            );
        },
    },
    {
        id: "flags",
        header: "Flags",
        cell: ({ row }) => {
            const clickInfo = row.original.click_info;
            if (!clickInfo) return <div>-</div>;

            const flags = [];
            if (clickInfo.is_bot) flags.push({ label: "BOT", color: "bg-red-100 text-red-800" });
            if (clickInfo.is_lead) flags.push({ label: "LEAD", color: "bg-blue-100 text-blue-800" });
            if (clickInfo.is_sale) flags.push({ label: "SALE", color: "bg-green-100 text-green-800" });
            if (clickInfo.is_reg) flags.push({ label: "REG", color: "bg-purple-100 text-purple-800" });
            if (clickInfo.is_rejected) flags.push({ label: "REJ", color: "bg-red-100 text-red-800" });
            if (clickInfo.is_unique_global) flags.push({ label: "UNQ", color: "bg-yellow-100 text-yellow-800" });
            if (clickInfo.is_using_proxy) flags.push({ label: "PROXY", color: "bg-orange-100 text-orange-800" });

            return (
                <div className="flex flex-wrap gap-1">
                    {flags.map((flag, index) => (
                        <span
                            key={index}
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${flag.color}`}
                        >
                            {flag.label}
                        </span>
                    ))}
                    {flags.length === 0 && <div className="text-gray-400">-</div>}
                </div>
            );
        },
    },
    {
        accessorKey: "click_info.isp",
        header: "ISP",
        cell: ({ row }) => {
            const isp = row.original.click_info?.isp;
            const operator = row.original.click_info?.operator;
            return (
                <div className="text-sm">
                    <div className="font-medium">{isp || "-"}</div>
                    {operator && <div className="text-gray-500">{operator}</div>}
                </div>
            );
        },
    },
    {
        accessorKey: "original_status",
        header: "Original Status",
        cell: ({ row }) => {
            const originalStatus = row.getValue("original_status") as string;
            const previousStatus = row.original.previous_status;

            return (
                <div className="text-sm">
                    <div className="font-medium">{originalStatus || "-"}</div>
                    {previousStatus && (
                        <div className="text-gray-500">← {previousStatus}</div>
                    )}
                </div>
            );
        },
    },
];