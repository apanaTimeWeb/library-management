// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_crm.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminCrmState } from "./admin_crm_store_types";

export const useAdminCrmStore = create<AdminCrmState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

