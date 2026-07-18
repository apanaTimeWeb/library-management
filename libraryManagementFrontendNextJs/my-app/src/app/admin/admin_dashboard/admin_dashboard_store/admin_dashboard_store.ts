// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_dashboard.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminDashboardState } from "./admin_dashboard_store_types";

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

