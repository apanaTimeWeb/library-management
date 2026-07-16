// RESPONSIBILITY: Custom hook isolating expense queries, debounce (`Rule 15`), URL sync (`Rule 42`), and derived stats (`Rule 6`).
// DATA FLOW: Store + URL Params -> useAdminAccountingExpenses -> Client Component (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminAccountingStore } from '@/app/admin/admin_accounting/admin_accounting_store/admin_accounting_store';
import { AdminAccountingExpenseFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';
import toast from 'react-hot-toast';

export function useAdminAccountingExpenses() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { expenses, fetchState, fetchExpenses, createExpense } = useAdminAccountingStore();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

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
    if (debouncedSearch.trim()) params.set('search', debouncedSearch.trim());
    else params.delete('search');

    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    else params.delete('category');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [debouncedSearch, categoryFilter, pathname, router, searchParams]);

  const categories = useMemo(() => Array.from(new Set(expenses.map(e => e.category))), [expenses]);

  const filteredExpenses = useMemo(() => {
    let result = expenses;
    if (categoryFilter !== 'all') {
      result = result.filter(e => e.category === categoryFilter);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(e => e.description.toLowerCase().includes(q) || e.paidBy.toLowerCase().includes(q));
    }
    return result;
  }, [expenses, categoryFilter, debouncedSearch]);

  const totalValue = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  const handleCreateExpense = useCallback(async (data: AdminAccountingExpenseFormData) => {
    const res = await createExpense(data);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [createExpense]);

  const handleResetFilters = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
    setCategoryFilter('all');
  }, []);

  return {
    expenses: filteredExpenses,
    categories,
    totalValue,
    fetchState,
    searchInput,
    categoryFilter,
    setSearchInput,
    setCategoryFilter,
    handleCreateExpense,
    handleResetFilters,
  };
}
