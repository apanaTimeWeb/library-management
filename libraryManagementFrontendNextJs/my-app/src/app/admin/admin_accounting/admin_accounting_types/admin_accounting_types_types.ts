import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
