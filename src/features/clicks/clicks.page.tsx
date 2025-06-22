import { useClicksList } from "@/features/clicks/model/use-clicks-list";
import { ClicksTable } from "./ui/clicks-table";
import { columns } from "./ui/columns";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { useState } from "react";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import { Switch } from "@/shared/ui/kit/switch";

export function Component() {
    const [filters, setFilters] = useState({
        leads: false,
        seals: false,
        unique: false,
        country: '',
    });

    const { clicks, isLoading } = useClicksList(filters);

    if (isLoading) {
        return (
            <div className="container mx-auto">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-1/4 rounded-lg" />

                    <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-1/3 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>

                    <div className="rounded-md border">
                        <div className="space-y-px p-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2">
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-24 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (!clicks) {
        return (
            <div className="container mx-auto py-10 text-center text-muted-foreground">
                No clicks found.
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="leads-filter"
                        checked={filters.leads}
                        onCheckedChange={(checked) => setFilters(f => ({ ...f, leads: checked }))}
                    />
                    <Label htmlFor="leads-filter">Leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="seals-filter"
                        checked={filters.seals}
                        onCheckedChange={(checked) => setFilters(f => ({ ...f, seals: checked }))}
                    />
                    <Label htmlFor="seals-filter">Seals</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="unique-filter"
                        checked={filters.unique}
                        onCheckedChange={(checked) => setFilters(f => ({ ...f, unique: checked }))}
                    />
                    <Label htmlFor="unique-filter">Unique</Label>
                </div>
                <div>
                    <Input
                        placeholder="Country"
                        value={filters.country}
                        onChange={(e) => setFilters(f => ({ ...f, country: e.target.value }))}
                    />
                </div>
            </div>
            <ClicksTable columns={columns} data={clicks} />
        </div>
    );
} 