// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_staff-users.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminStaffUsersState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminStaffUsersStore = create<AdminStaffUsersState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
