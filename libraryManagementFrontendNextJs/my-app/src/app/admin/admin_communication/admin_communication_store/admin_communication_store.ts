// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_communication.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';


export interface AdminCommunicationState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminCommunicationStore = create<AdminCommunicationState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

