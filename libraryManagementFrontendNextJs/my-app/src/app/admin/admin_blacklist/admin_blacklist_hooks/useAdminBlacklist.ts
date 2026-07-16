// RESPONSIBILITY: Custom hook isolating blacklist data fetching, search debounce (`Rule 15`), URL state sync (`Rule 42`), and sensitive phone masking (`Rule 45`, `Rule 6`, `Rule 38`).
// DATA FLOW: Store + URL Params -> useAdminBlacklist -> Client Component / Dialogs (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminBlacklistStore } from '@/app/admin/admin_blacklist/admin_blacklist_store/admin_blacklist_store';
import { BlacklistedStudentRecord, AdminBlacklistFormData } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';
import toast from 'react-hot-toast';

/**
 * Masks sensitive phone numbers to prevent accidental PII exposure (`Rule 45`).
 * Example: '9876501234' -> '98****1234'
 */
export function maskSensitiveData(phone: string): string {
  if (!phone || phone.length < 6) return '******';
  const firstTwo = phone.slice(0, 2);
  const lastFour = phone.slice(-4);
  return `${firstTwo}****${lastFour}`;
}

/**
 * Custom hook for Admin Blacklist management.
 * Handles:
 * - Fetching blacklist records on initial mount.
 * - Debouncing search input (300ms) before filtering (`Rule 15`).
 * - Syncing search query with URL search params (`Rule 42`).
 * - Mutations: adding and removing students (`Rule 14`).
 */
export function useAdminBlacklist() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { list, fetchState, fetchBlacklist, addToBlacklist, removeFromBlacklist } = useAdminBlacklistStore();

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [selectedStudent, setSelectedStudent] = useState<BlacklistedStudentRecord | null>(null);

  // Fetch initial blacklist on mount
  // Dependency array is intentionally empty as fetchBlacklist is stable and we only fetch once on mount (`Rule 55`)
  useEffect(() => {
    fetchBlacklist();
  }, [fetchBlacklist]);

  // Debounce search input (`Rule 15`)
  // Dependency array monitors searchInput to trigger 300ms debounce timer whenever search text changes (`Rule 55`)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync debounced search to URL query parameters (`Rule 42`)
  // Dependency array monitors debouncedSearch, pathname, router, and searchParams to sync cleanly (`Rule 55`)
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

  const filteredList = useMemo(() => {
    if (!debouncedSearch) return list;
    const q = debouncedSearch.toLowerCase();
    return list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.reason.toLowerCase().includes(q) ||
        b.blacklistedBy.toLowerCase().includes(q) ||
        b.previousSeat.toLowerCase().includes(q)
    );
  }, [list, debouncedSearch]);

  const handleAddStudent = useCallback(async (data: AdminBlacklistFormData) => {
    const res = await addToBlacklist(data);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [addToBlacklist]);

  const handleRemoveStudent = useCallback(async (id: string) => {
    const res = await removeFromBlacklist(id);
    if (res.success) {
      toast.success(res.message); (`Rule 14`)
    }
    return res;
  }, [removeFromBlacklist]);

  const handleResetSearch = useCallback(() => {
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    list: filteredList,
    totalCount: list.length,
    fetchState,
    searchInput,
    selectedStudent,
    setSearchInput,
    setSelectedStudent,
    handleAddStudent,
    handleRemoveStudent,
    handleResetSearch,
  };
}
