import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/shared/lib/css";
import { SortingState } from "@/shared/lib/react/use-server-sorting";

interface SortableHeaderProps {
    field: string;
    children: React.ReactNode;
    sorting: SortingState;
    onSort: (field: string) => void;
    className?: string;
}

export function SortableHeader({
    field,
    children,
    sorting,
    onSort,
    className
}: SortableHeaderProps) {
    const isActive = sorting.field === field;
    const direction = isActive ? sorting.direction : null;

    const getSortIcon = () => {
        if (!isActive) {
            return;
        }

        return direction === 'asc'
            ? <IconChevronUp className="h-4 w-4" />
            : <IconChevronDown className="h-4 w-4" />;
    };

    return (
        <button
            onClick={() => onSort(field)}
            className={cn(
                "flex items-center gap-2 font-medium hover:text-foreground transition-colors text-left",
                isActive ? "text-foreground" : "text-muted-foreground",
                className
            )}
        >
            {children}
            {getSortIcon()}
        </button>
    );
} 