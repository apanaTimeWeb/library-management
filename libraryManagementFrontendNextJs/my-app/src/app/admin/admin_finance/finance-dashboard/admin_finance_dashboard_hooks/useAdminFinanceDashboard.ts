// RESPONSIBILITY: Renders the useAdminFinanceDashboard.ts component/hook.
import { useState, useEffect } from 'react';
import { ADMIN_FINANCE_MOCK_DASHBOARD_STATS, ADMIN_FINANCE_MOCK_RECENT_PAYMENTS } from '@/app/admin/admin_finance/admin_finance_constants/AdminFinanceConstants';

export interface DashboardStats {
  totalCollections: number; 
  collectionsGrowth: number; 
  activeStudents: number;
  expiringSoon: number; 
  suspended: number; 
  totalReferrals: number;
  depositsHeld: number; 
  pendingPromises: number; 
  overdueStudents: number;
  pendingRefunds: number; 
  renewalsDue: number; 
  lateFeeAccrued: number;
}

export interface RecentPayment {
  id: number; 
  studentName: string; 
  studentSmartId: string;
  amount: number; 
  mode: string; 
  date: string;
}

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
