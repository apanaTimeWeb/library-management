// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_dashboard.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminDashboardState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

