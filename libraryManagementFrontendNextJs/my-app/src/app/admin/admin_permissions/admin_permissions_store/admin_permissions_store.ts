// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_permissions.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminPermissionsState } from "./admin_permissions_store_types";

export const useAdminPermissionsStore = create<AdminPermissionsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

