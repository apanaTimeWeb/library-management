// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_staff-users.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminStaffUsersState } from "./admin_staff-users_store_types";

export const useAdminStaffUsersStore = create<AdminStaffUsersState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

