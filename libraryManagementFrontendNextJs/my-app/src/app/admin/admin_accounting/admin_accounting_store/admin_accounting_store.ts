// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_accounting.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminAccountingState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminAccountingStore = create<AdminAccountingState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
