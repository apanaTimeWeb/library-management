// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_seats_shifts_lockers.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminSeatsShiftsLockersState } from "./admin_seats_shifts_lockers_store_types";

export const useAdminSeatsShiftsLockersStore = create<AdminSeatsShiftsLockersState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

