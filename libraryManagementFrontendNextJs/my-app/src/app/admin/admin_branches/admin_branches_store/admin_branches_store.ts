// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_branches.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminBranchesState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminBranchesStore = create<AdminBranchesState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
