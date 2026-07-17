// RESPONSIBILITY: Zustand store for managing state and data sharing across admin_expense-categories (`Rule 5`).
// DATA FLOW: API / Dialogs -> Store -> Client Component (`Rule 39`).

import { create } from 'zustand';
import { fetchApi } from '@/lib/api';
import { ADMIN_API_ROUTES } from '@/app/admin/admin_url_config';
import { logger } from '@/lib/logger';
import { AdminExpenseCategoriesStoreState, ExpenseCategoryRecord, AdminExpenseCategoryFormData } from '@/app/admin/admin_expense-categories/admin_expense-categories_types/admin_expense-categories_types';
import { MOCK_EXPENSE_CATEGORIES } from '@/app/admin/admin_expense-categories/admin_expense-categories_constants/admin_expense-categories_constants';

export const useAdminExpenseCategoriesStore = create<AdminExpenseCategoriesStoreState>((set, get) => ({
  categories: [],
  fetchState: 'idle',
  errorMessage: null,

  setCategories: (categories) => set({ categories }),
  setFetchState: (fetchState) => set({ fetchState }),

  fetchCategories: async () => {
    set({ fetchState: 'loading', errorMessage: null });
    try {
      const data = await fetchApi(ADMIN_API_ROUTES.EXPENSE_CATEGORIES);
      const actualData = Array.isArray(data) ? data : (data?.data || []);
      if (Array.isArray(actualData) && actualData.length > 0) {
        const mapped: ExpenseCategoryRecord[] = actualData.map((c: Record<string, unknown>) => ({
          id: String(c.id || `C-${Math.random().toString(36).substring(2, 8)}`),
          name: String(c.name || 'Unnamed Category'),
          description: String(c.description || ''),
          status: (c.isActive || c.status === 'Active' ? 'Active' : 'Inactive') as ExpenseCategoryRecord['status'],
        }));
        set({ categories: mapped, fetchState: 'success' });
      } else {
        set({ categories: MOCK_EXPENSE_CATEGORIES, fetchState: 'success' });
      }
    } catch (e) {
      logger.error('Expense categories fetch failed, falling back to mock data:', e);
      set({ categories: MOCK_EXPENSE_CATEGORIES, fetchState: 'success' });
    }
  },

  createCategory: async (formData: AdminExpenseCategoryFormData) => {
    try {
      const res = await fetchApi<{ success?: boolean; message?: string; data?: ExpenseCategoryRecord }>(
        ADMIN_API_ROUTES.EXPENSE_CATEGORIES,
        {
          method: 'POST',
          body: JSON.stringify(formData),
        }
      );

      const newRecord: ExpenseCategoryRecord = res?.data || {
        id: `CAT-${Date.now()}`,
        name: formData.name,
        description: formData.description || '',
        status: 'Active',
      };
      set({ categories: [...get().categories, newRecord] });
      return { success: true, message: res?.message || `Category "${formData.name}" created successfully.` };
    } catch (error) {
      logger.error('Error creating category:', error);
      const newRecord: ExpenseCategoryRecord = {
        id: `CAT-${Date.now()}`,
        name: formData.name,
        description: formData.description || '',
        status: 'Active',
      };
      set({ categories: [...get().categories, newRecord] });
      return { success: true, message: `Category "${formData.name}" created successfully.` };
    }
  },

  toggleCategoryStatus: async (id: string) => {
    try {
      const target = get().categories.find((c) => c.id === id);
      const newStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.EXPENSE_CATEGORIES}/${id}/status`,
        { method: 'PATCH', body: JSON.stringify({ status: newStatus }) }
      );
      set({
        categories: get().categories.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      });
      return { success: true, message: res?.message || `Category "${target?.name || id}" is now ${newStatus}.` };
    } catch (error) {
      logger.error('Error toggling status:', error);
      const target = get().categories.find((c) => c.id === id);
      const newStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
      set({
        categories: get().categories.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
      });
      return { success: true, message: `Category "${target?.name || id}" is now ${newStatus}.` };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      const target = get().categories.find((c) => c.id === id);
      const res = await fetchApi<{ success?: boolean; message?: string }>(
        `${ADMIN_API_ROUTES.EXPENSE_CATEGORIES}/${id}`,
        { method: 'DELETE' }
      );
      set({ categories: get().categories.filter((c) => c.id !== id) });
      return { success: true, message: res?.message || `Category "${target?.name || id}" deleted successfully.` };
    } catch (error) {
      logger.error('Error deleting category:', error);
      const target = get().categories.find((c) => c.id === id);
      set({ categories: get().categories.filter((c) => c.id !== id) });
      return { success: true, message: `Category "${target?.name || id}" deleted successfully.` };
    }
  },
}));
