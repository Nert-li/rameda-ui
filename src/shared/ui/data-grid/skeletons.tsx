import { Skeleton } from "@/shared/ui/kit/skeleton"

// Скелетон для панели фильтров (поиск + кнопка колонок)
export function FiltersSkeleton({
    showColumnButton = true,
    showSearchFilter = true,
}: {
    showColumnButton?: boolean
    showSearchFilter?: boolean
}) {
    return (
        <div className="flex items-center justify-between px-4 lg:px-6 p-4 pt-0">
            <div className="flex items-center gap-4">
                {showSearchFilter && (
                    <Skeleton className="h-10 w-72 max-w-sm" />
                )}
            </div>

            {showColumnButton && (
                <Skeleton className="h-9 w-36 bg-slate-300" />
            )}
        </div>
    )
}

// Скелетон для панели пагинации
export function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            {/* Информация о записях - левая часть */}
            <div className="hidden flex-1 lg:flex">
                <Skeleton className="h-4 w-48 bg-slate-300 dark:bg-slate-600" />
            </div>

            <div className="flex w-full items-center gap-8 lg:w-fit">
                {/* Селект количества строк на странице */}
                <div className="hidden items-center gap-2 lg:flex">
                    <Skeleton className="h-4 w-24 bg-slate-300 dark:bg-slate-600" />
                    <Skeleton className="h-9 w-20 bg-slate-300 dark:bg-slate-600" />
                </div>

                {/* Текущая страница */}
                <div className="flex w-fit items-center justify-center">
                    <Skeleton className="h-4 w-24 bg-slate-300 dark:bg-slate-600" />
                </div>

                {/* Кнопки навигации */}
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    {/* Первая страница - скрыта на мобильных */}
                    <Skeleton className="hidden h-8 w-8 p-0 lg:flex rounded-md bg-slate-300 dark:bg-slate-600" />
                    {/* Предыдущая страница */}
                    <Skeleton className="h-8 w-8 rounded-md bg-slate-300 dark:bg-slate-600" />
                    {/* Следующая страница */}
                    <Skeleton className="h-8 w-8 rounded-md bg-slate-300 dark:bg-slate-600" />
                    {/* Последняя страница - скрыта на мобильных */}
                    <Skeleton className="hidden h-8 w-8 p-0 lg:flex rounded-md bg-slate-300 dark:bg-slate-600" />
                </div>
            </div>
        </div>
    )
}

// Скелетон таблицы - занимает flex-1 пространство
export function TableSkeleton({
    rowCount = 10,
    columnCount = 5,
}: {
    rowCount?: number
    columnCount?: number
}) {
    const getSkeletonWidth = (cellIndex: number, totalColumns: number) => {
        if (cellIndex === 0) return "w-3/4" // Первая колонка обычно название - длиннее
        if (cellIndex === totalColumns - 1) return "w-16" // Последняя колонка обычно действия - короче
        if (cellIndex % 3 === 0) return "w-2/3" // Каждая третья колонка средней длины
        if (cellIndex % 2 === 0) return "w-1/2" // Четные колонки короче
        return "w-full" // Нечетные колонки длиннее
    }

    return (
        <div className="overflow-auto rounded-lg border bg-card/50 shadow-sm h-full">
            <div className="min-w-full">
                {/* Header skeleton */}
                <div className="bg-muted/80 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-muted/60 border-b border-border">
                    <div className="flex">
                        {Array.from({ length: columnCount }).map((_, index) => {
                            const isEven = index % 2 === 0
                            const borderClass = isEven
                                ? "border-r-2 border-border/50"
                                : "border-r-2 border-border/80"

                            return (
                                <div key={index} className={`p-3 font-semibold flex-1 min-w-[120px] ${borderClass}`}>
                                    <Skeleton className="h-4 w-20 bg-slate-300 dark:bg-slate-600" />
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Body skeleton */}
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    {Array.from({ length: rowCount }).map((_, rowIndex) => {
                        const isEvenRow = rowIndex % 2 === 0
                        const rowBgClass = isEvenRow ? "bg-transparent" : "bg-muted/50"

                        return (
                            <div key={rowIndex} className={`flex border-b border-border/60 hover:bg-muted/60 transition-colors ${rowBgClass}`}>
                                {Array.from({ length: columnCount }).map((_, cellIndex) => {
                                    const isEven = cellIndex % 2 === 0
                                    const borderClass = isEven
                                        ? "border-r-2 border-border/50"
                                        : "border-r-2 border-border/80"

                                    const skeletonWidth = getSkeletonWidth(cellIndex, columnCount)

                                    return (
                                        <div key={cellIndex} className={`p-3 flex-1 min-w-[120px] ${borderClass}`}>
                                            <Skeleton className={`h-4 ${skeletonWidth} bg-slate-300 dark:bg-slate-600`} />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Компактный скелетон пагинации для мобильных устройств
export function CompactPaginationSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4">
            {/* Селект размера страницы */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-16" />
            </div>

            {/* Кнопки навигации */}
            <div className="flex items-center gap-1">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
            </div>
        </div>
    )
} 