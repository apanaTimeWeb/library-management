// RESPONSIBILITY: Custom hook isolating coupon fetching, search debounce (`Rule 15`), URL state syncing (`Rule 42`), and KPI statistics (`Rule 6`, `Rule 38`).
// DATA FLOW: Store + URL Params -> useAdminCoupons -> Client Component / Dialogs (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminCouponsStore } from '@/app/admin/admin_coupons/admin_coupons_store/admin_coupons_store';
import { CouponRecord, AdminCouponFormData } from '@/app/admin/admin_coupons/admin_coupons_types/admin_coupons_types';
import toast from 'react-hot-toast';

/**
 * Custom hook for Admin Coupons management.
 * Handles:
 * - Fetching coupons on initial mount.
 * - Debounced search query (300ms delay) before applying table filtering (`Rule 15`).
 * - Syncing search query with URL params (`Rule 42`).
 * - Computing real-time KPI metrics (`Total`, `Active`, `Expired`, `Total Uses`).
 * - Mutations for coupon creation and deletion (`Rule 14`).
 */
export function useAdminCoupons() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { coupons, fetchState, fetchCoupons, createCoupon, deleteCoupon } = useAdminCouponsStore();

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponRecord | null>(null);

  // Fetch initial coupons on mount
  // Dependency array is empty since fetchCoupons is stable and runs once on mount (`Rule 55`)
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // Debounce search input (`Rule 15`)
  // Dependency array monitors searchInput to trigger 300ms debounce timer whenever typing changes (`Rule 55`)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync debounced search to URL query parameters (`Rule 42`)
  // Dependency array monitors debouncedSearch, pathname, router, and searchParams (`Rule 55`)
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

  const filteredCoupons = useMemo(() => {
    if (!debouncedSearch) return coupons;
    const q = debouncedSearch.toLowerCase();
    return coupons.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q) ||
        String(c.discount).includes(q)
    );
  }, [coupons, debouncedSearch]);

  const kpis = useMemo(() => {
    const activeCount = coupons.filter((c) => c.status === 'Active').length;
    const expiredCount = coupons.filter((c) => c.status === 'Expired' || c.status === 'Exhausted').length;
    const totalUses = coupons.reduce((acc, c) => acc + c.usedCount, 0);
    return {
      totalCount: coupons.length,
      activeCount,
      expiredCount,
      totalUses,
    };
  }, [coupons]);

  const handleCreateCoupon = useCallback(async (data: AdminCouponFormData) => {
    const res = await createCoupon(data);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [createCoupon]);

  const handleDeleteCoupon = useCallback(async (id: string) => {
    const res = await deleteCoupon(id);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [deleteCoupon]);

  const handleResetSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    coupons: filteredCoupons,
    kpis,
    fetchState,
    searchInput,
    selectedCoupon,
    setSearchInput,
    setSelectedCoupon,
    handleCreateCoupon,
    handleDeleteCoupon,
    handleResetSearch,
  };
}
