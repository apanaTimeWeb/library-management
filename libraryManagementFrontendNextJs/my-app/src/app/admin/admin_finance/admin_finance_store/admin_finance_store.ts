// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_finance.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminFinanceState } from "./admin_finance_store_types";

export const useAdminFinanceStore = create<AdminFinanceState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

