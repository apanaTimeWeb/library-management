import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
