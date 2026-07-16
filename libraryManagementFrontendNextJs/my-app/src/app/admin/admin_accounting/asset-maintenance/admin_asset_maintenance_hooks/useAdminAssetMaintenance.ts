// RESPONSIBILITY: Custom hook isolating maintenance queries, debounce (`Rule 15`), URL sync (`Rule 42`), and derived stats (`Rule 6`).
// DATA FLOW: Store + URL Params -> useAdminAssetMaintenance -> Client Component (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminAccountingStore } from '@/app/admin/admin_accounting/admin_accounting_store/admin_accounting_store';
import { AdminAssetMaintenanceFormData } from '@/app/admin/admin_accounting/admin_accounting_types/admin_accounting_types';
import toast from 'react-hot-toast';

export function useAdminAssetMaintenance() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { maintenance, fetchState, fetchMaintenance, createMaintenance } = useAdminAccountingStore();

  const initialSearch = searchParams.get('search') || '';
  const initialType = searchParams.get('type') || 'all';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState(initialType);

  // Fetch on mount (`Rule 55`)
  useEffect(() => {
    fetchMaintenance();
  }, [fetchMaintenance]);

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

    if (typeFilter !== 'all') params.set('type', typeFilter);
    else params.delete('type');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [debouncedSearch, typeFilter, pathname, router, searchParams]);

  const filteredMaintenance = useMemo(() => {
    let result = maintenance;
    if (typeFilter !== 'all') {
      result = result.filter(m => m.type === typeFilter);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(m => m.assetName.toLowerCase().includes(q) || m.vendor.toLowerCase().includes(q));
    }
    return result;
  }, [maintenance, typeFilter, debouncedSearch]);

  const totalMaintenanceCost = useMemo(() => {
    return filteredMaintenance.reduce((sum, m) => sum + m.cost, 0);
  }, [filteredMaintenance]);

  const handleCreateMaintenance = useCallback(async (data: AdminAssetMaintenanceFormData) => {
    const res = await createMaintenance(data);
    if (res.success) toast.success(res.message); (`Rule 14`)
    return res;
  }, [createMaintenance]);

  const handleResetFilters = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
    setTypeFilter('all');
  }, []);

  return {
    maintenance: filteredMaintenance,
    totalCost: totalMaintenanceCost,
    fetchState,
    searchInput,
    typeFilter,
    setSearchInput,
    setTypeFilter,
    handleCreateMaintenance,
    handleResetFilters,
  };
}
