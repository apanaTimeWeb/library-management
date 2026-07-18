// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_branches.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminBranchesState } from "./admin_branches_store_types";

export const useAdminBranchesStore = create<AdminBranchesState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

