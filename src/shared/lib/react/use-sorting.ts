import { useQueryParam, StringParam } from "use-query-params";

export interface SortingState {
  field: string | null;
  direction: 'asc' | 'desc';
}

export interface UseSortingReturn {
  sorting: SortingState;
  handleSort: (field: string) => void;
  getSortParams: () => Record<string, string>;
}

export interface UseSortingOptions {
  defaultField?: string | null;
  defaultDirection?: 'asc' | 'desc';
}

/**
 * Хук для управления сортировкой с синхронизацией URL
 * - Автоматическая синхронизация с URL
 * - Минимальный код
 * - Отсутствие побочных эффектов
 */
export const useSorting = (options: UseSortingOptions = {}): UseSortingReturn => {
  const { defaultField = null, defaultDirection = 'desc' } = options;

  // use-query-params автоматически синхронизирует с URL
  const [order, setOrder] = useQueryParam('_order', StringParam);

  // Парсинг текущего состояния из URL параметра
  const getCurrentSorting = (): SortingState => {
    if (!order) {
      return { field: defaultField, direction: defaultDirection };
    }

    if (order.startsWith('-')) {
      return { field: order.slice(1), direction: 'desc' };
    }

    return { field: order, direction: 'asc' };
  };

  const sorting = getCurrentSorting();

  // Обработчик клика по колонке
  const handleSort = (field: string) => {
    const { field: currentField, direction: currentDirection } = sorting;

    // Если это та же колонка - переключаем направление
    if (currentField === field) {
      const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
      const newOrder = newDirection === 'desc' ? `-${field}` : field;
      setOrder(newOrder);
    } else {
      // Новая колонка - используем дефолтное направление
      const newOrder = defaultDirection === 'desc' ? `-${field}` : field;
      setOrder(newOrder);
    }
  };

  // Параметры для API
  const getSortParams = (): Record<string, string> => {
    if (!sorting.field) return {};

    const orderParam = sorting.direction === 'desc'
      ? `-${sorting.field}`
      : sorting.field;

    return { _order: orderParam };
  };

  return {
    sorting,
    handleSort,
    getSortParams
  };
};