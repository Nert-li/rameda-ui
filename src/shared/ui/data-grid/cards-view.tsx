import type { CardGridProps } from "./types"
import { Skeleton } from "@/shared/ui/kit/skeleton"

function LoadingCards({
    itemCount,
}: {
    itemCount: number
}) {
    return (
        <>
            {Array.from({ length: itemCount }).map((_, index) => (
                <div
                    key={`skeleton-${index}`}
                    className="bg-card/50 rounded-lg border p-4 space-y-3"
                >
                    {/* Header row - название/title */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    {/* Body content - основная информация */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    {/* Footer row - действия или метаданные */}
                    <div className="flex items-center justify-between pt-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                </div>
            ))}
        </>
    )
}

export function CardsView<TData>({
    data,
    renderCard,
    className = "",
    cardClassName = "",
    cardsPerRow = 3,
    emptyMessage = "No results.",
    isLoading = false,
    loadingItemCount = 6,
    onItemClick,
}: CardGridProps<TData>) {
    const gridCols = cardsPerRow === 1 ? 'grid-cols-1' :
        cardsPerRow === 2 ? 'grid-cols-1 md:grid-cols-2' :
            cardsPerRow === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                cardsPerRow === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

    if (isLoading) {
        return (
            <div className={`grid ${gridCols} gap-4 ${className}`}>
                <LoadingCards
                    itemCount={loadingItemCount}
                // cardsPerRow={cardsPerRow}
                />
            </div>
        )
    }

    if (!data.length) {
        return (
            <div className={`flex items-center justify-center h-32 text-muted-foreground ${className}`}>
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className={`grid ${gridCols} gap-4 ${className}`}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`${cardClassName} ${onItemClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onItemClick?.(item, index)}
                >
                    {renderCard(item, index)}
                </div>
            ))}
        </div>
    )
} 