// RESPONSIBILITY: Type definitions and Zod form schemas for all admin_accounting sub-pages (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialogs, and Client Components.

import { z } from 'zod';
import { AssetRecord, AccountingExpenseRecord, AssetMaintenanceRecord, AdminAccountingStoreState, FetchState, AdminAssetFormData, AdminAccountingExpenseFormData, AdminAssetMaintenanceFormData } from "./admin_accounting_types_types";

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
