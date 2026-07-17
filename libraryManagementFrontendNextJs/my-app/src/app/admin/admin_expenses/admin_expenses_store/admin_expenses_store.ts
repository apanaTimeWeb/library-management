// RESPONSIBILITY: Zustand store for managing asynchronous state for admin_expenses (`Rule 5`).
// DATA FLOW: API -> Store -> Client Component (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminExpensesStoreState, ExpenseRecord } from '@/app/admin/admin_expenses/admin_expenses_types/admin_expenses_types';
import { MOCK_EXPENSES } from '@/app/admin/admin_expenses/admin_expenses_constants/admin_expenses_constants';

export const useAdminExpensesStore = create<AdminExpensesStoreState>((set) => ({
  expenses: [],
  fetchState: 'idle',
  errorMessage: null,

  setExpenses: (expenses) => set({ expenses }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchExpenses: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.EXPENSES);
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      
      if (actualData.length === 0 || actualData[0]?.id?.startsWith('MOCK-')) {
        set({ expenses: MOCK_EXPENSES, fetchState: 'success' });
        return;
      }

      if (Array.isArray(actualData)) {
        const mapped: ExpenseRecord[] = actualData.map((e: Record<string, unknown>) => ({
          id: String(e.id || `E-${Math.random().toString(36).substring(2, 8)}`),
          date: e.expenseDate ? new Date(String(e.expenseDate)).toLocaleDateString() : String(e.date || '01/01/2026'),
          category: String(e.category || 'Monthly Expense'),
          recordedBy: String(e.recordedBy || 'Admin'),
          amount: Number(e.amount || 0),
          status: String(e.status || 'Approved'),
          branch: String(e.branch || 'All Branches'),
        }));
        set({ expenses: mapped, fetchState: 'success' });
      } else {
        set({ expenses: MOCK_EXPENSES, fetchState: 'success' });
      }
    } catch (error) {
      logger.error('Expenses fetch failed, falling back to mock data:', error);
      set({ expenses: MOCK_EXPENSES, fetchState: 'success' });
    }
  },
}));
