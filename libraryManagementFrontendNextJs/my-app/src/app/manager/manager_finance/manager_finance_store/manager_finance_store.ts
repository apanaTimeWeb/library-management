import { create } from 'zustand';
import { ManagerFinanceTransaction, ManagerFinanceInvoice, ManagerFinanceStats } from '@/app/manager/manager_finance/manager_finance_types/manager_finance_types';
import { RECENT_TRANSACTIONS_MOCK, INVOICES_MOCK, FINANCE_STATS_MOCK } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

interface ManagerFinanceState {
  transactions: ManagerFinanceTransaction[];
  invoices: ManagerFinanceInvoice[];
  stats: ManagerFinanceStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  fetchInvoices: () => Promise<void>;
}

export const useManagerFinanceStore = create<ManagerFinanceState>((set, get) => ({
  transactions: [],
  invoices: [],
  stats: null,
  status: 'idle',
  error: null,
  fetchDashboardData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ transactions: RECENT_TRANSACTIONS_MOCK, stats: FINANCE_STATS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },
  fetchInvoices: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ invoices: INVOICES_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
