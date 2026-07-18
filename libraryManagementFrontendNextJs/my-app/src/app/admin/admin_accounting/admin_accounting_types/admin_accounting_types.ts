// RESPONSIBILITY: Type definitions and Zod form schemas for all admin_accounting sub-pages (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialogs, and Client Components.

import { z } from 'zod';


export interface AssetRecord {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  location: string;
  status: 'active' | 'maintenance' | 'disposed';
}
export interface AccountingExpenseRecord {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidBy: string;
  mode: 'cash' | 'upi' | 'card' | 'bank';
}
export interface AssetMaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  date: string;
  type: 'routine' | 'repair' | 'upgrade';
  cost: number;
  vendor: string;
  status: 'scheduled' | 'completed' | 'pending';
}
export interface AdminAccountingStoreState {
  assets: AssetRecord[];
  expenses: AccountingExpenseRecord[];
  maintenance: AssetMaintenanceRecord[];
  fetchState: FetchState;
  fetchAssets: () => Promise<void>;
  createAsset: (data: AdminAssetFormData) => Promise<{ success: boolean; message: string }>;
  fetchExpenses: () => Promise<void>;
  createExpense: (data: AdminAccountingExpenseFormData) => Promise<{ success: boolean; message: string }>;
  fetchMaintenance: () => Promise<void>;
  createMaintenance: (data: AdminAssetMaintenanceFormData) => Promise<{ success: boolean; message: string }>;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AdminAssetFormData = z.infer<typeof adminAssetFormSchema>;
export type AdminAccountingExpenseFormData = z.infer<typeof adminAccountingExpenseFormSchema>;
export type AdminAssetMaintenanceFormData = z.infer<typeof adminAssetMaintenanceFormSchema>;

// ASSETS
export const adminAssetFormSchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  category: z.string().min(2, 'Category required'),
  purchaseDate: z.string().min(1, 'Date required'),
  purchaseValue: z.number().positive('Must be > 0'),
  location: z.string().min(2, 'Location required'),
});
// EXPENSES (Accounting module version)
export const adminAccountingExpenseFormSchema = z.object({
  date: z.string().min(1, 'Date required'),
  category: z.string().min(2, 'Category required'),
  description: z.string().optional(),
  amount: z.number().positive('Must be > 0'),
  paidBy: z.string().min(2, 'Paid by required'),
  mode: z.enum(['cash', 'upi', 'card', 'bank']),
});
// ASSET MAINTENANCE
export const adminAssetMaintenanceFormSchema = z.object({
  assetId: z.string().min(1, 'Asset required'),
  date: z.string().min(1, 'Date required'),
  type: z.enum(['routine', 'repair', 'upgrade']),
  cost: z.number().nonnegative('Cost cannot be negative'),
  vendor: z.string().min(2, 'Vendor required'),
  status: z.enum(['scheduled', 'completed', 'pending']),
});
