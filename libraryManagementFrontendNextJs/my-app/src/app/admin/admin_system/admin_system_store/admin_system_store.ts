// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_system.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminSystemState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminSystemStore = create<AdminSystemState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
