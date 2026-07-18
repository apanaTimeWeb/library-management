// RESPONSIBILITY: Custom hook encapsulating audit logs filtering, debounced search (`Rule 15`), URL state sync (`Rule 42`), and detail modal selection (`Rule 6`, `Rule 38`).
// DATA FLOW: Store + URL Params -> useAdminAuditLogs -> AdminAuditLogsClient (`Rule 39`).

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAdminAuditLogsStore } from '@/app/admin/admin_audit-logs/admin_audit-logs_store/admin_audit-logs_store';
import { AuditLogRecord, AuditLogTabType } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';
import { AUDIT_LOG_TABS } from '@/app/admin/admin_audit-logs/admin_audit-logs_constants/admin_audit-logs_constants';

/**
 * Custom hook for Admin Audit Logs.
 * Handles:
 * - Fetching logs from Zustand store on mount.
 * - Debouncing search query input (300ms delay) before applying filtering (`Rule 15`).
 * - Syncing active severity tab and search term to URL parameters (`Rule 42`).
 * - Managing selected row for detail drawer inspection (`Rule 19`).
 *
 * @returns Filtered audit logs, loading states, filter setters, and detail modal handlers.
 */
export function useAdminAuditLogs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { logs, fetchState, fetchLogs } = useAdminAuditLogsStore();

  const initialTab = useMemo(() => {
    const paramTab = searchParams.get('severity') as AuditLogTabType;
    return AUDIT_LOG_TABS.includes(paramTab) ? paramTab : 'all';
  }, [searchParams]);

  const initialSearch = searchParams.get('search') || '';

  const [activeTab, setActiveTab] = useState<AuditLogTabType>(initialTab);
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [selectedLog, setSelectedLog] = useState<AuditLogRecord | null>(null);

  // Fetch logs on initial mount
  // Dependency array is intentionally empty as fetchLogs is stable and we only fetch on initial mount (`Rule 55`)
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Debounce search input (`Rule 15`)
  // Dependency array includes searchInput to trigger 300ms timer whenever typing changes (`Rule 55`)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync state to URL parameters (`Rule 42`)
  // Dependency array monitors activeTab, debouncedSearch, pathname, and router to update URL cleanly (`Rule 55`)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeTab && activeTab !== 'all') {
      params.set('severity', activeTab);
    } else {
      params.delete('severity');
    }

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    } else {
      params.delete('search');
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(targetUrl, { scroll: false });
  }, [activeTab, debouncedSearch, pathname, router, searchParams]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesTab = activeTab === 'all' || log.severity === activeTab;
      const matchesSearch =
        !debouncedSearch ||
        log.action.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.module.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.details.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [logs, activeTab, debouncedSearch]);

  const handleResetFilters = useCallback(() => {
    setActiveTab('all');
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  return {
    logs: filteredLogs,
    fetchState,
    activeTab,
    searchInput,
    selectedLog,
    setActiveTab,
    setSearchInput,
    setSelectedLog,
    handleResetFilters,
  };
}
