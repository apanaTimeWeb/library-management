// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_engagement.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminEngagementState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminEngagementStore = create<AdminEngagementState>((set: unknown) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
