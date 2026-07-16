// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_plans.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminPlansState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminPlansStore = create<AdminPlansState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
