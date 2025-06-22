import { IconTrendingUp, IconEye, IconTarget, IconCreditCard, IconChartLine } from "@tabler/icons-react";
import { Badge } from "@/shared/ui/kit/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/kit/card";

interface AdsManagerMetricsProps {
    totalAdsManagers: number;
    totalOffers: number;
    totalSpend: number;
    totalReports: number;
    isLoading?: boolean;
}

export function AdsManagerMetrics({
    totalAdsManagers,
    totalOffers,
    totalSpend,
    totalReports,
    isLoading = false
}: AdsManagerMetricsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="@container/card animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        </CardHeader>
                        <CardFooter>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Ads Managers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalAdsManagers.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconChartLine className="size-4" />
                            Active
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Campaign managers <IconEye className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Managing advertising campaigns
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Offers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalOffers.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTarget className="size-4" />
                            Running
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Active campaigns <IconTarget className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Offers across all managers
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Spend</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        ${totalSpend.toFixed(2)}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="size-4" />
                            Tracking
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Campaign investment <IconCreditCard className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Total advertising spend
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Reports</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalReports.toLocaleString()}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp className="size-4" />
                            Generated
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Performance tracking <IconChartLine className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Reports across all campaigns
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
} 