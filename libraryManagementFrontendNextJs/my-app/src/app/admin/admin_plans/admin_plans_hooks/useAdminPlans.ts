// RESPONSIBILITY: Custom hook isolating plan queries, search debounce (`Rule 15`), URL state sync (`Rule 42`), and status mutations (`Rule 6`, `Rule 38`).
// DATA FLOW: Store + URL Params -> useAdminPlans -> Client Component / Dialogs (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminPlansStore } from '@/app/admin/admin_plans/admin_plans_store/admin_plans_store';
import { PlanRecord, AdminPlanFormData } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';
import toast from 'react-hot-toast';

/**
 * Custom hook for Admin Membership Plans management.
 * Handles:
 * - Fetching plans on mount (`Rule 55`).
 * - Debounced search input (300ms) before filtering (`Rule 15`).
 * - Syncing search query with URL params (`Rule 42`).
 * - Mutations for saving (create/update), status toggling, and deletion (`Rule 14`).
 */
export function useAdminPlans() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { plans, fetchState, fetchPlans, savePlan, togglePlanStatus, deletePlan } = useAdminPlansStore();

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [editingPlan, setEditingPlan] = useState<PlanRecord | null>(null);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<PlanRecord | null>(null);

  // Fetch initial plans on mount
  // Dependency array is empty since fetchPlans is stable and runs once on mount (`Rule 55`)
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Debounce search input (`Rule 15`)
  // Dependency array monitors searchInput (`Rule 55`)
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

  const filteredPlans = useMemo(() => {
    if (!debouncedSearch) return plans;
    const q = debouncedSearch.toLowerCase();
    return plans.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.duration?.toLowerCase().includes(q) ||
        p.status?.toLowerCase().includes(q) ||
        p.features?.some((f) => f.toLowerCase().includes(q))
    );
  }, [plans, debouncedSearch]);

  const handleSavePlan = useCallback(async (data: AdminPlanFormData, editingId?: string | null) => {
    const res = await savePlan(data, editingId);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [savePlan]);

  const handleToggleStatus = useCallback(async (id: string) => {
    const res = await togglePlanStatus(id);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [togglePlanStatus]);

  const handleDeletePlan = useCallback(async (id: string) => {
    const res = await deletePlan(id);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [deletePlan]);

  const handleResetSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    plans: filteredPlans,
    totalCount: plans.length,
    fetchState,
    searchInput,
    editingPlan,
    selectedPlanDetails,
    setSearchInput,
    setEditingPlan,
    setSelectedPlanDetails,
    handleSavePlan,
    handleToggleStatus,
    handleDeletePlan,
    handleResetSearch,
  };
}
