// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_settings.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminSettingsState } from "./admin_settings_store_types";

export const useAdminSettingsStore = create<AdminSettingsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

