import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface SortingState {
  field: string | null;
  direction: 'asc' | 'desc';
}

export interface UseServerSortingOptions {
  defaultSort?: SortingState;
  syncWithUrl?: boolean;
  onSortChange?: (sort: SortingState) => void;
}

export interface UseServerSortingReturn {
  sorting: SortingState;
  handleSort: (field: string) => void;
  getSortParams: () => Record<string, string>;
  setSorting: (sort: SortingState) => void;
  resetSorting: () => void;
}

export const useServerSorting = (options: UseServerSortingOptions = {}): UseServerSortingReturn => {
  const {
    defaultSort = { field: null, direction: 'desc' },
    syncWithUrl = true,
    onSortChange
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  // Парсим _order параметр из URL
  const parseOrderParam = useCallback((orderParam: string | null): SortingState => {
    if (!orderParam) return defaultSort;

    if (orderParam.startsWith('-')) {
      // Убывание: -created_at -> {field: 'created_at', direction: 'desc'}
      return {
        field: orderParam.slice(1),
        direction: 'desc'
      };
    } else {
      // Возрастание: created_at -> {field: 'created_at', direction: 'asc'}
      return {
        field: orderParam,
        direction: 'asc'
      };
    }
  }, [defaultSort]);

  // Генерируем _order параметр из состояния сортировки
  const generateOrderParam = useCallback((sorting: SortingState): string | null => {
    if (!sorting.field) return null;

    return sorting.direction === 'desc'
      ? `-${sorting.field}`
      : sorting.field;
  }, []);

  // Инициализация состояния сортировки из URL или дефолтных значений
  const initializeSorting = useCallback((): SortingState => {
    if (syncWithUrl) {
      const urlOrder = searchParams.get('_order');
      return parseOrderParam(urlOrder);
    }
    return defaultSort;
  }, [searchParams, syncWithUrl, defaultSort, parseOrderParam]);

  const [sorting, setSortingState] = useState<SortingState>(initializeSorting);

  // Обработка изменения сортировки
  const handleSort = useCallback((field: string) => {
    setSortingState(prev => {
      const newDirection: 'asc' | 'desc' =
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';

      return {
        field,
        direction: newDirection
      };
    });
  }, []);

  // Получение параметров для API запроса
  const getSortParams = useCallback((): Record<string, string> => {
    const orderParam = generateOrderParam(sorting);
    if (!orderParam) return {};

    return {
      _order: orderParam
    };
  }, [sorting, generateOrderParam]);

  // Установка сортировки
  const setSorting = useCallback((newSort: SortingState) => {
    setSortingState(newSort);
  }, []);

  // Сброс сортировки
  const resetSorting = useCallback(() => {
    setSortingState(defaultSort);
  }, [defaultSort]);

  // Синхронизация с URL
  useEffect(() => {
    if (syncWithUrl) {
      const newParams = new URLSearchParams(searchParams);
      const orderParam = generateOrderParam(sorting);

      if (orderParam) {
        newParams.set('_order', orderParam);
      } else {
        newParams.delete('_order');
      }

      // Обновляем URL только если параметры изменились
      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [sorting, syncWithUrl, searchParams, setSearchParams, generateOrderParam]);

  // Вызов колбэка при изменении сортировки
  useEffect(() => {
    if (onSortChange) {
      onSortChange(sorting);
    }
  }, [sorting, onSortChange]);

  return {
    sorting,
    handleSort,
    getSortParams,
    setSorting,
    resetSorting
  };
};

// Специализированные хуки для каждой фичи (можно добавлять импорты и API хуки)
export const useConversionsListWithSorting = (options: any = {}) => {
  const sorting = useServerSorting({ defaultSort: { field: 'created_at', direction: 'desc' } });

  return {
    data: [], // Заглушка - заменить на реальный API вызов
    isLoading: false,
    ...sorting
  };
};

export const useClicksListWithSorting = (options: any = {}) => {
  const sorting = useServerSorting({ defaultSort: { field: 'created_at', direction: 'desc' } });

  return {
    data: [], // Заглушка - заменить на реальный API вызов  
    isLoading: false,
    ...sorting
  };
};

export const useUsersListWithSorting = (options: any = {}) => {
  const sorting = useServerSorting({ defaultSort: { field: 'created_at', direction: 'desc' } });

  return {
    data: [], // Заглушка - заменить на реальный API вызов
    isLoading: false,
    ...sorting
  };
}; 