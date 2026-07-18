// RESPONSIBILITY: Renders the useAdminFinanceDashboard.ts component/hook.
import { useState, useEffect } from 'react';
import { ADMIN_FINANCE_MOCK_DASHBOARD_STATS, ADMIN_FINANCE_MOCK_RECENT_PAYMENTS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { DashboardStats, RecentPayment } from "./useAdminFinanceDashboard_types";

export function useAdminFinanceDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { 
      setStats(ADMIN_FINANCE_MOCK_DASHBOARD_STATS as DashboardStats); 
      setRecentPayments(ADMIN_FINANCE_MOCK_RECENT_PAYMENTS); 
      setIsLoading(false); 
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return {
    stats,
    recentPayments,
    isLoading
  };
}
