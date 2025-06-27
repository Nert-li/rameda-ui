import { IconTable, IconLayoutGrid } from "@tabler/icons-react"

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group"
import type { ViewMode } from "../types"

interface ViewToggleProps {
    viewMode: ViewMode
    onViewModeChange: (mode: ViewMode) => void
    className?: string
}

export function ViewToggle({
    viewMode,
    onViewModeChange,
    className = ""
}: ViewToggleProps) {
    return (
        <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
            className={className}
        >
            <ToggleGroupItem value="table" aria-label="Table view">
                <IconTable size={16} />
                <span className="hidden sm:inline ml-1">Table</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="cards" aria-label="Cards view">
                <IconLayoutGrid size={16} />
                <span className="hidden sm:inline ml-1">Cards</span>
            </ToggleGroupItem>
        </ToggleGroup>
    )
} 