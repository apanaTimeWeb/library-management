// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_reports.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminReportsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminReportsStore = create<AdminReportsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

