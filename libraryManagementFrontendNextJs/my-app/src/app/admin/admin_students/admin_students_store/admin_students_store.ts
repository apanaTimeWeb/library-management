// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_students.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminStudentsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminStudentsStore = create<AdminStudentsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
