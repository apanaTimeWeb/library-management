// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_reusable.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminReusableState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminReusableStore = create<AdminReusableState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
