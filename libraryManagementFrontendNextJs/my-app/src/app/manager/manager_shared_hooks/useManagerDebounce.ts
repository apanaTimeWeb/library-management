// RESPONSIBILITY: Renders or handles logic for useManagerDebounce.ts.
import { useState, useEffect } from 'react';

// DATA FLOW: Hook -> useManagerDebounce -> Consuming UI Component
export function useManagerDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

