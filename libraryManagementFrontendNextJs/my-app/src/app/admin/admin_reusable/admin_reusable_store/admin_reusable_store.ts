// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_reusable.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminReusableState } from "./admin_reusable_store_types";

export const useAdminReusableStore = create<AdminReusableState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

