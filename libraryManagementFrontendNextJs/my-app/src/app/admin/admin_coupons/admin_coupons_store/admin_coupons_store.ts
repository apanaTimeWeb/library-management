// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_coupons.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminCouponsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminCouponsStore = create<AdminCouponsState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
