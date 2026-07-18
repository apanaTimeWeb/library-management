// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_reports.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminReportsState } from "./admin_reports_store_types";

export const useAdminReportsStore = create<AdminReportsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

