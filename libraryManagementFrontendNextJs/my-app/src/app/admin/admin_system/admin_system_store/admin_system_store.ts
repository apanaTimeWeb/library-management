// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_system.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminSystemState } from "./admin_system_store_types";

export const useAdminSystemStore = create<AdminSystemState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

