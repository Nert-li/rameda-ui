import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface SortingState {
  field: string | null;
  direction: 'asc' | 'desc';
}

export interface UseServerSortingReturn {
  sorting: SortingState;
  handleSort: (field: string) => void;
  getSortParams: () => Record<string, string>;
}

export interface UseServerSortingOptions {
  defaultField?: string | null;
  defaultDirection?: 'asc' | 'desc';
}

export const useServerSorting = (options: UseServerSortingOptions = {}): UseServerSortingReturn => {
  const { defaultField = null, defaultDirection = 'desc' } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  // Инициализация из URL или дефолтов
  const initializeSorting = useCallback((): SortingState => {
    const urlOrder = searchParams.get('_order');

    if (urlOrder) {
      if (urlOrder.startsWith('-')) {
        return { field: urlOrder.slice(1), direction: 'desc' };
      } else {
        return { field: urlOrder, direction: 'asc' };
      }
    }

    return { field: defaultField, direction: defaultDirection };
  }, [searchParams, defaultField, defaultDirection]);

  const [sorting, setSorting] = useState<SortingState>(initializeSorting);

  // Обработка клика по колонке
  const handleSort = useCallback((field: string) => {
    setSorting(prev => {
      const newDirection: 'asc' | 'desc' =
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';

      return { field, direction: newDirection };
    });
  }, []);

  // Параметры для API
  const getSortParams = useCallback((): Record<string, string> => {
    if (!sorting.field) return {};

    const orderParam = sorting.direction === 'desc'
      ? `-${sorting.field}`
      : sorting.field;

    return { _order: orderParam };
  }, [sorting]);

  // Синхронизация с URL
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (sorting.field) {
      const orderParam = sorting.direction === 'desc'
        ? `-${sorting.field}`
        : sorting.field;
      newParams.set('_order', orderParam);
    } else {
      newParams.delete('_order');
    }

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [sorting, searchParams, setSearchParams]);

  return {
    sorting,
    handleSort,
    getSortParams
  };
};