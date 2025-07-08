import { useReactTable, flexRender, Row } from "@tanstack/react-table"
import { useMemo } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/kit/table"

interface TableViewProps<TData> {
    table: ReturnType<typeof useReactTable<TData>>
    emptyMessage?: string
    onRowClick?: (row: Row<TData>) => void
    className?: string
}

export function TableView<TData>({
    table,
    emptyMessage = "No results.",
    onRowClick,
    className = "",
}: TableViewProps<TData>) {
    const columns = table.getAllColumns()

    // Мемоизируем заголовки - не изменяются при сортировке данных
    const tableHeader = useMemo(() => (
        <TableHeader className="bg-muted/80 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-border">
                    {headerGroup.headers.map((header, index) => {
                        const isEven = index % 2 === 0
                        const borderClass = isEven
                            ? "border-r-2 border-border/50"
                            : "border-r-2 border-border/80"

                        return (
                            <TableHead
                                key={header.id}
                                colSpan={header.colSpan}
                                className={`${borderClass} font-semibold`}
                            >
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
    ), [table.getHeaderGroups()]) // Зависит только от структуры заголовков

    // Тело таблицы - пересчитывается при изменении данных
    const tableBody = useMemo(() => {
        const rows = table.getRowModel().rows

        if (!rows?.length) {
            return (
                <TableBody>
                    <TableRow className="border-b border-border/60 bg-transparent">
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center text-muted-foreground"
                        >
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                </TableBody>
            )
        }

        return (
            <TableBody>
                {rows.map((row, rowIndex) => {
                    const isEvenRow = rowIndex % 2 === 0
                    const rowBgClass = isEvenRow ? "bg-transparent" : "bg-muted/50"

                    return (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={`border-b border-border/60 hover:bg-muted/70 active:bg-muted/80 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''} ${rowBgClass}`}
                            onClick={() => onRowClick?.(row)}
                        >
                            {row.getVisibleCells().map((cell, index) => {
                                const isEven = index % 2 === 0
                                const borderClass = isEven
                                    ? "border-r-2 border-border/50"
                                    : "border-r-2 border-border/80"

                                return (
                                    <TableCell
                                        key={cell.id}
                                        className={`${borderClass} transition-colors duration-150`}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        )
    }, [table.getRowModel().rows, emptyMessage, columns.length, onRowClick]) // Зависит от данных

    return (
        <div className={`overflow-auto rounded-lg border bg-card/50 shadow-sm ${className}`}>
            <Table className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                {tableHeader}
                {tableBody}
            </Table>
        </div>
    )
} 