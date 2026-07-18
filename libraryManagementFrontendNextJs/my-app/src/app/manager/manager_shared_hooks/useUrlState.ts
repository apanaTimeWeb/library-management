'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlState(key: string, defaultValue: string): [string, (val: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = searchParams.get(key) || defaultValue;

  const setValue = useCallback((newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue !== defaultValue) params.set(key, newValue);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }, [key, defaultValue, searchParams, router, pathname]);

  return [value, setValue];
}
