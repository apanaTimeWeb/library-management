// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_expense-categories.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminExpenseCategoriesState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminExpenseCategoriesStore = create<AdminExpenseCategoriesState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
