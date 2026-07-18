// RESPONSIBILITY: Custom hook isolating asset queries, debounce (`Rule 15`), URL sync (`Rule 42`), and derived stats (`Rule 6`).
// DATA FLOW: Store + URL Params -> useAdminAssets -> Client Component (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminAccountingStore } from '@/app/admin/admin_accounting/admin_accounting_store/admin_accounting_store';
import { AdminAssetFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';
import toast from 'react-hot-toast';

export function useAdminAssets() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { assets, fetchState, fetchAssets, createAsset } = useAdminAccountingStore();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  // Fetch on mount (`Rule 55`)
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

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

  const categories = useMemo(() => Array.from(new Set(assets.map(a => a.category))), [assets]);

  const filteredAssets = useMemo(() => {
    let result = assets;
    if (categoryFilter !== 'all') {
      result = result.filter(a => a.category === categoryFilter);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q));
    }
    return result;
  }, [assets, categoryFilter, debouncedSearch]);

  const totalValue = useMemo(() => {
    return assets.filter(a => a.status !== 'disposed').reduce((sum, a) => sum + a.currentValue, 0);
  }, [assets]);

  const handleCreateAsset = useCallback(async (data: AdminAssetFormData) => {
    const res = await createAsset(data);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [createAsset]);

  const handleResetFilters = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
    setCategoryFilter('all');
  }, []);

  return {
    assets: filteredAssets,
    categories,
    totalValue,
    fetchState,
    searchInput,
    categoryFilter,
    setSearchInput,
    setCategoryFilter,
    handleCreateAsset,
    handleResetFilters,
  };
}
