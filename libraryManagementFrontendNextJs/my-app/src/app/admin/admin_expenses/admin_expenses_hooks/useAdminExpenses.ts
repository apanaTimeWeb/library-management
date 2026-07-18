// RESPONSIBILITY: Custom hook isolating expense queries, search debounce (`Rule 15`), URL state sync (`Rule 42`), and context filtering (`Rule 6`, `Rule 38`).
// DATA FLOW: Store + Context + URL -> useAdminExpenses -> Client Component (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminExpensesStore } from '@/app/admin/admin_expenses/admin_expenses_store/admin_expenses_store';
import { useAdmin } from '@/app/admin/admin_store/AdminContext';

export function useAdminExpenses() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { selectedBranch } = useAdmin();
  const { expenses, fetchState, fetchExpenses } = useAdminExpensesStore();

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Fetch on mount (`Rule 55`)
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Debounce search (`Rule 15`)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // URL sync (`Rule 42`)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    } else {
      params.delete('search');
    }
    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [debouncedSearch, pathname, router, searchParams]);

  const filteredExpenses = useMemo(() => {
    const branchFiltered = selectedBranch === 'All Branches'
      ? expenses
      : expenses.filter((e) => e.branch === selectedBranch);

    if (!debouncedSearch) return branchFiltered;
    const q = debouncedSearch.toLowerCase();
    
    return branchFiltered.filter(
      (e) =>
        e.category.toLowerCase().includes(q) ||
        e.recordedBy.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q) ||
        e.branch.toLowerCase().includes(q)
    );
  }, [expenses, selectedBranch, debouncedSearch]);

  const handleResetSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    expenses: filteredExpenses,
    totalCount: filteredExpenses.length,
    fetchState,
    searchInput,
    selectedBranch,
    setSearchInput,
    handleResetSearch,
  };
}
