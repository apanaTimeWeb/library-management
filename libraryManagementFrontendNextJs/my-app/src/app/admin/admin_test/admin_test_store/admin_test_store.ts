// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_test.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminTestState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminTestStore = create<AdminTestState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

