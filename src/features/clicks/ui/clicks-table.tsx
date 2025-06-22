"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/kit/table"

import { Button } from "@/shared/ui/kit/button"
import { Input } from "@/shared/ui/kit/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu"
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
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [countryFilter, setCountryFilter] = React.useState<string>("")
    const [filters, setFilters] = React.useState({
        leads: false,
        seals: false,
        unique: false,
        country: '',
    });

    // Получаем уникальные страны из данных
    const uniqueCountries = React.useMemo(() => {
        const countries = data.map((item: TData) => (item as Record<string, unknown>).country as string).filter(Boolean)
        return Array.from(new Set(countries)).sort()
    }, [data])

    // Применяем фильтр по стране
    React.useEffect(() => {
        if (countryFilter && countryFilter !== "all") {
            setColumnFilters(prev => [
                ...prev.filter(filter => filter.id !== 'country'),
                { id: 'country', value: countryFilter }
            ])
        } else {
            setColumnFilters(prev => prev.filter(filter => filter.id !== 'country'))
        }
    }, [countryFilter])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
    })

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="flex items-center gap-4 py-4">
                <Input
                    placeholder="Filter by subid or ip..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

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

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex-1 flex flex-col rounded-md border overflow-hidden">
                <Table className="h-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="flex-1 overflow-auto">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
} 