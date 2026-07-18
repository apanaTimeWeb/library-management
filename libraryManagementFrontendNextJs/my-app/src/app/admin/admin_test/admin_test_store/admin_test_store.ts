// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_test.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminTestState } from "./admin_test_store_types";

export const useAdminTestStore = create<AdminTestState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

