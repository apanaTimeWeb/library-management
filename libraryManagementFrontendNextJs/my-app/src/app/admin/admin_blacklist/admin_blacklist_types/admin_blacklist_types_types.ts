import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface BlacklistedStudentRecord {
  id: string;
  name: string;
  phone: string;
  reason: string;
  blacklistedBy: string;
  blacklistedOn: string;
  previousSeat: string;
}
export interface AdminBlacklistStoreState {
  list: BlacklistedStudentRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchBlacklist: () => Promise<void>;
  addToBlacklist: (data: AdminBlacklistFormData) => Promise<{ success: boolean; message: string }>;
  removeFromBlacklist: (id: string) => Promise<{ success: boolean; message: string }>;
  setList: (list: BlacklistedStudentRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AdminBlacklistFormData = z.infer<typeof adminBlacklistFormSchema>;
