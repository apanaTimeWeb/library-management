// RESPONSIBILITY: Type definitions and Zod validation schemas for admin_blacklist module (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface BlacklistedStudentRecord {
  id: string;
  name: string;
  phone: string;
  reason: string;
  blacklistedBy: string;
  blacklistedOn: string;
  previousSeat: string;
}

export const adminBlacklistFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian phone number starting with 6-9'),
  reason: z.string().min(5, 'Please provide a clear reason (min 5 characters)').max(300, 'Reason too long'),
  previousSeat: z.string().optional(),
});

export type AdminBlacklistFormData = z.infer<typeof adminBlacklistFormSchema>;

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
