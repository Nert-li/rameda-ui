import { useState } from "react";
import { useEffect } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Реэкспорт всех хуков из папки react
export { usePagination } from './react/use-pagination';
export { useRouteAccess } from './react/use-route-access';
export { useSorting } from './react/use-sorting';
