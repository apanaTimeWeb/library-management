import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface PlanRecord {
  id: string;
  name: string;
  price: number;
  duration: string;
  durationDays: number;
  features: string[];
  status: PlanStatus;
  subscribers: number;
}
export interface AdminPlansStoreState {
  plans: PlanRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchPlans: () => Promise<void>;
  savePlan: (data: AdminPlanFormData, editingId?: string | null) => Promise<{ success: boolean; message: string }>;
  togglePlanStatus: (id: string) => Promise<{ success: boolean; message: string }>;
  deletePlan: (id: string) => Promise<{ success: boolean; message: string }>;
  setPlans: (plans: PlanRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type PlanStatus = 'Active' | 'Inactive';
export type AdminPlanFormData = z.infer<typeof adminPlanFormSchema>;
