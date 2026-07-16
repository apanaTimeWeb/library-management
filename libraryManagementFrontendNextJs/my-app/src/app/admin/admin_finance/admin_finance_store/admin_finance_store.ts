// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_finance.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminFinanceState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminFinanceStore = create<AdminFinanceState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

