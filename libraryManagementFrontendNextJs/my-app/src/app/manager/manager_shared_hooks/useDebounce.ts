import { useState, useEffect } from 'react';

// DATA FLOW: Hook -> useDebounce -> Consuming UI Component
/**
 * Custom hook for debouncing an input value.
 * Useful for delaying search queries or API calls until the user stops typing.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
