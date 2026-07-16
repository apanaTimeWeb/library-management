// RESPONSIBILITY: Zustand store for managing asynchronous state and data sharing across admin_audit-logs.
// DATA FLOW: API / Components -> Store -> Components

import { create } from 'zustand';

interface AdminAuditLogsState {
  data: unknown[];
  setData: (data: unknown[]) => void;
}

export const useAdminAuditLogsStore = create<AdminAuditLogsState>((set) => ({
  data: [],
  setData: (data: unknown[]) => set({ data }),
}));
