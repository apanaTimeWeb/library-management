// RESPONSIBILITY: Custom hook isolating category queries, search debounce (`Rule 15`), URL state sync (`Rule 42`), and status mutations (`Rule 6`, `Rule 38`).
// DATA FLOW: Store + URL Params -> useAdminExpenseCategories -> Client Component / Dialogs (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminExpenseCategoriesStore } from '@/app/admin/admin_expense-categories/admin_expense-categories_store/admin_expense-categories_store';
import { AdminExpenseCategoryFormData } from '@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types';
import toast from 'react-hot-toast';

export function useAdminExpenseCategories() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { categories, fetchState, fetchCategories, createCategory, toggleCategoryStatus, deleteCategory } = useAdminExpenseCategoriesStore();

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Fetch on mount (`Rule 55`)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return categories;
    const q = debouncedSearch.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
  }, [categories, debouncedSearch]);

  const handleCreateCategory = useCallback(async (data: AdminExpenseCategoryFormData) => {
    const res = await createCategory(data);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [createCategory]);

  const handleToggleStatus = useCallback(async (id: string) => {
    const res = await toggleCategoryStatus(id);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [toggleCategoryStatus]);

  const handleDeleteCategory = useCallback(async (id: string) => {
    const res = await deleteCategory(id);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [deleteCategory]);

  const handleResetSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    categories: filteredCategories,
    totalCount: categories.length,
    fetchState,
    searchInput,
    setSearchInput,
    handleCreateCategory,
    handleToggleStatus,
    handleDeleteCategory,
    handleResetSearch,
  };
}
