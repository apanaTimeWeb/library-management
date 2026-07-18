import { useEffect } from 'react';
import { useDashboardStore } from '@/app/manager/manager_dashboard/manager_dashboard_store/manager_dashboard_store';

/**
 * Custom hook to fetch and manage dashboard data.
 * DATA FLOW: API → useManagerDashboardData → ManagerDashboardClient
 */
// DATA FLOW: API → useManagerDashboardData.ts → DashboardDataComponent
export function useManagerDashboardData() {
  const { data, status, error, fetchData } = useDashboardStore();

  // Fetch data on mount if idle, dependencies included to satisfy linter
  // DEPENDENCY AUDIT: Executed on mount or when key dependencies (like search terms, filters, IDs) change.
  useEffect(() => {
    if (status === 'idle') {
      fetchData();
    }
  }, [status, fetchData]);

  return { data, status, error };
}
