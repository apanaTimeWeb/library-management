'use client';
// RESPONSIBILITY: Abstract hook to manage URL query parameters as state. Fulfills Rule 42.

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useUrlState<T extends string = string>(key: string, defaultValue: T): [T, (val: T) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = (searchParams.get(key) as T) || defaultValue;

  const setValue = useCallback((newValue: T) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue !== defaultValue) {
      params.set(key, newValue);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [key, defaultValue, searchParams, router, pathname]);

  return [value, setValue];
}
