import { useEffect } from "react";
import { useMatches } from "react-router-dom";

/**
 * Hook to automatically set document title based on route handle
 * Gets title from current route handle and sets it with app name suffix
 */
export function useAutoTitle() {
    const matches = useMatches();

    useEffect(() => {
        const currentMatch = matches[matches.length - 1];
        const title = (currentMatch?.handle as { title?: string })?.title;

        if (title) {
            const previousTitle = document.title;
            document.title = `${title} | Rameda`;

            return () => {
                document.title = previousTitle;
            };
        }
    }, [matches]);
}
