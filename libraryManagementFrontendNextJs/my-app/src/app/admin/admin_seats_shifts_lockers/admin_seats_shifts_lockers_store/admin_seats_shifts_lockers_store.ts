// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_seats_shifts_lockers.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminSeatsShiftsLockersState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminSeatsShiftsLockersStore = create<AdminSeatsShiftsLockersState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
