// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_reusable.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';


export interface AdminReusableState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminReusableStore = create<AdminReusableState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

