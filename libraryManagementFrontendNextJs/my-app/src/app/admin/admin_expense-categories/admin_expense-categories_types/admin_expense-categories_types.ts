// RESPONSIBILITY: Type definitions and Zod form schema for admin_expense-categories (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';


export interface ExpenseCategoryRecord {
  id: string;
  name: string;
  description: string;
  status: ExpenseCategoryStatus;
}
export interface AdminExpenseCategoriesStoreState {
  categories: ExpenseCategoryRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (data: AdminExpenseCategoryFormData) => Promise<{ success: boolean; message: string }>;
  toggleCategoryStatus: (id: string) => Promise<{ success: boolean; message: string }>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message: string }>;
  setCategories: (categories: ExpenseCategoryRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type ExpenseCategoryStatus = 'Active' | 'Inactive';
export type AdminExpenseCategoryFormData = z.infer<typeof adminExpenseCategoryFormSchema>;

export const adminExpenseCategoryFormSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters').max(50, 'Category name is too long'),
  description: z.string().max(200, 'Description cannot exceed 200 characters').optional(),
});
