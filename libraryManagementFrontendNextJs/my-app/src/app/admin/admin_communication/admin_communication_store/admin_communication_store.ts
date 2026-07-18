// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_communication.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminCommunicationState } from "./admin_communication_store_types";

export const useAdminCommunicationStore = create<AdminCommunicationState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

