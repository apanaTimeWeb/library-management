import { create } from 'zustand';
import {
  ManagerAccountingExpense,
  ManagerAccountingDailySettlement,
  ManagerAccountingSeatGap,
  ManagerAccountingAsset,
  ManagerAccountingAssetMaintenance,
  ManagerAccountingStats
} from '@/app/manager/manager_accounting/manager_accounting_types/manager_accounting_types';
import {
  ACCOUNTING_STATS_MOCK,
  EXPENSES_MOCK,
  DAILY_SETTLEMENTS_MOCK,
  SEAT_GAPS_MOCK,
  ASSETS_MOCK,
  ASSET_MAINTENANCE_MOCK
} from '@/app/manager/manager_accounting/manager_accounting_constants/manager_accounting_constants';

interface ManagerAccountingState {
  expenses: ManagerAccountingExpense[];
  dailySettlements: ManagerAccountingDailySettlement[];
  seatGaps: ManagerAccountingSeatGap[];
  assets: ManagerAccountingAsset[];
  assetMaintenance: ManagerAccountingAssetMaintenance[];
  stats: ManagerAccountingStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;

  fetchExpenses: () => Promise<void>;
  fetchDailySettlements: () => Promise<void>;
  fetchSeatGaps: () => Promise<void>;
  fetchAssets: () => Promise<void>;
  fetchAssetMaintenance: () => Promise<void>;
}

export const useManagerAccountingStore = create<ManagerAccountingState>((set, get) => ({
  expenses: [],
  dailySettlements: [],
  seatGaps: [],
  assets: [],
  assetMaintenance: [],
  stats: null,
  status: 'idle',
  error: null,

  fetchExpenses: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ expenses: EXPENSES_MOCK, stats: ACCOUNTING_STATS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchDailySettlements: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ dailySettlements: DAILY_SETTLEMENTS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchSeatGaps: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ seatGaps: SEAT_GAPS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchAssets: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ assets: ASSETS_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  },

  fetchAssetMaintenance: async () => {
    if (get().status === 'loading') return;
    set({ status: 'loading', error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ assetMaintenance: ASSET_MAINTENANCE_MOCK, status: 'success' });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : 'Unknown error', status: 'error' });
    }
  }
}));
