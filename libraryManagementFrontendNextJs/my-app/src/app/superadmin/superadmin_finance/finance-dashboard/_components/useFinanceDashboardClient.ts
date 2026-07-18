/**
 * RESPONSIBILITY: Logic and state management for the FinanceDashboardClient component.
 */
import { useState, useEffect } from 'react';
import type { SuperadminFinanceDashboardStats, SuperadminFinanceRecentPayment } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_DASHBOARD_MOCK_STATS, SUPERADMIN_FINANCE_RECENT_PAYMENTS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

export function useFinanceDashboardClient() {
  const [stats, setStats] = useState<SuperadminFinanceDashboardStats | null>(null);
  const [recentPayments, setRecentPayments] = useState<SuperadminFinanceRecentPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setStats(SUPERADMIN_FINANCE_DASHBOARD_MOCK_STATS);
      setRecentPayments(SUPERADMIN_FINANCE_RECENT_PAYMENTS as SuperadminFinanceRecentPayment[]);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return {
    stats,
    recentPayments,
    isLoading,
  };
}
