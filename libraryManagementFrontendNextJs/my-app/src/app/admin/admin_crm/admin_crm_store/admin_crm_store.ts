// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_crm.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';


export interface AdminCrmState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminCrmStore = create<AdminCrmState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

