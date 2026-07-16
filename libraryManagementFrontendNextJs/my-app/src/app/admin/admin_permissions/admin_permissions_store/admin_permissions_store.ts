// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_permissions.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminPermissionsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminPermissionsStore = create<AdminPermissionsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

