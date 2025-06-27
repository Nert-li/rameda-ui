import { useState, useCallback } from 'react';

export interface PaginationState {
    page: number;
    limit: number;
}

export interface PaginationHelpers {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setPageWithReset: (limit: number) => void;
    reset: () => void;
    formatForUI: (paginationData?: {
        current_page: number;
        total_pages: number;
        total_count: number;
        page_size: number;
    }) => {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        pageSize: number;
        onPageChange: (page: number) => void;
        onPageSizeChange: (limit: number) => void;
    } | undefined;
}

export type UsePaginationReturn = PaginationState & PaginationHelpers;

export function usePagination(
    initialPage = 1,
    initialLimit = 25
): UsePaginationReturn {
    const [page, setPageState] = useState(initialPage);
    const [limit, setLimitState] = useState(initialLimit);

    const setPage = useCallback((newPage: number) => {
        setPageState(newPage);
    }, []);

    const setLimit = useCallback((newLimit: number) => {
        setLimitState(newLimit);
    }, []);

    const setPageWithReset = useCallback((newLimit: number) => {
        setLimitState(newLimit);
        setPageState(1);
    }, []);

    const reset = useCallback(() => {
        setPageState(initialPage);
        setLimitState(initialLimit);
    }, [initialPage, initialLimit]);

    const formatForUI = useCallback((paginationData?: {
        current_page: number;
        total_pages: number;
        total_count: number;
        page_size: number;
    }) => {
        if (!paginationData) return undefined;

        return {
            currentPage: paginationData.current_page,
            totalPages: paginationData.total_pages,
            totalCount: paginationData.total_count,
            pageSize: paginationData.page_size,
            onPageChange: setPage,
            onPageSizeChange: setPageWithReset,
        };
    }, [setPage, setPageWithReset]);

    return {
        page,
        limit,
        setPage,
        setLimit,
        setPageWithReset,
        reset,
        formatForUI,
    };
} 