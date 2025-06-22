import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { UniversalDataTable } from "@/shared/ui/universal-data-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/kit/select"
import { Switch } from "@/shared/ui/kit/switch"
import { Label } from "@/shared/ui/kit/label"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function ClicksTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [countryFilter, setCountryFilter] = React.useState<string>("")
    const [filters, setFilters] = React.useState({
        leads: false,
        seals: false,
        unique: false,
    });

    // Получаем уникальные страны из данных
    const uniqueCountries = React.useMemo(() => {
        const countries = data.map((item: TData) => (item as Record<string, unknown>).country as string).filter(Boolean)
        return Array.from(new Set(countries)).sort()
    }, [data])

    // Дополнительные фильтры для clicks
    const additionalFilters = (
        <>
            <Select value={countryFilter || "all"} onValueChange={(value) => setCountryFilter(value === "all" ? "" : value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                            {country}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

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
        </>
    );

    return (
        <UniversalDataTable
            columns={columns}
            data={data}
            searchPlaceholder="Filter by subid or ip..."
            additionalFilters={additionalFilters}
        />
    )
} 