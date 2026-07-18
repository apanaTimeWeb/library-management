// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_engagement.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminEngagementState } from "./admin_engagement_store_types";

export const useAdminEngagementStore = create<AdminEngagementState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

