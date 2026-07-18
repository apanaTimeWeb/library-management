// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_students.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';
import { AdminStudentsState } from "./admin_students_store_types";

export const useAdminStudentsStore = create<AdminStudentsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));

