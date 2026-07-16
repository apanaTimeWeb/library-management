// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_expenses.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminExpensesState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminExpensesStore = create<AdminExpensesState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
