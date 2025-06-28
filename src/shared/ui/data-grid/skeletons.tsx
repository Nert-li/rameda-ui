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
        <div className="flex items-center justify-between px-4 lg:px-6 p-4">
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