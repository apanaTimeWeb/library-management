import { create } from 'zustand';
import { 
  ManagerFinanceTransaction, 
  ManagerFinanceInvoice, 
  ManagerFinanceStats,
  ManagerFinanceSubscription,
  ManagerFinanceRenewal,
  ManagerFinanceLateFee,
  ManagerFinanceSecurityDeposit,
  ManagerFinanceRefund,
  ManagerFinancePaymentPromise,
  ManagerFinanceReferral
} from '@/app/manager/manager_finance/manager_finance_types/manager_finance_types';
import { 
  RECENT_TRANSACTIONS_MOCK, 
  INVOICES_MOCK, 
  FINANCE_STATS_MOCK,
  SUBSCRIPTIONS_MOCK,
  RENEWALS_MOCK,
  LATE_FEES_MOCK,
  SECURITY_DEPOSITS_MOCK,
  REFUNDS_MOCK,
  PAYMENT_PROMISES_MOCK,
  REFERRALS_MOCK
} from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

interface ManagerFinanceState {
  transactions: ManagerFinanceTransaction[];
  invoices: ManagerFinanceInvoice[];
  subscriptions: ManagerFinanceSubscription[];
  renewals: ManagerFinanceRenewal[];
  lateFees: ManagerFinanceLateFee[];
  securityDeposits: ManagerFinanceSecurityDeposit[];
  refunds: ManagerFinanceRefund[];
  paymentPromises: ManagerFinancePaymentPromise[];
  referrals: ManagerFinanceReferral[];
  stats: ManagerFinanceStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  
  // Fetch Methods
  fetchDashboardData: () => Promise<void>;
  fetchInvoices: () => Promise<void>;
  fetchSubscriptions: () => Promise<void>;
  fetchRenewals: () => Promise<void>;
  fetchLateFees: () => Promise<void>;
  fetchSecurityDeposits: () => Promise<void>;
  fetchRefunds: () => Promise<void>;
  fetchPaymentPromises: () => Promise<void>;
  fetchReferrals: () => Promise<void>;
}

export const useManagerFinanceStore = create<ManagerFinanceState>((set, get) => ({
  transactions: [],
  invoices: [],
  subscriptions: [],
  renewals: [],
  lateFees: [],
  securityDeposits: [],
  refunds: [],
  paymentPromises: [],
  referrals: [],
  stats: null,
  status: 'idle',
  error: null,

  fetchDashboardData: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
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
  },

  fetchSubscriptions: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ subscriptions: SUBSCRIPTIONS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchRenewals: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ renewals: RENEWALS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchLateFees: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ lateFees: LATE_FEES_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchSecurityDeposits: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ securityDeposits: SECURITY_DEPOSITS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchRefunds: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ refunds: REFUNDS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchPaymentPromises: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ paymentPromises: PAYMENT_PROMISES_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },


  fetchReferrals: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ referrals: REFERRALS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
