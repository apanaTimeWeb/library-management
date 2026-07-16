// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_blacklist.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminBlacklistState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminBlacklistStore = create<AdminBlacklistState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
