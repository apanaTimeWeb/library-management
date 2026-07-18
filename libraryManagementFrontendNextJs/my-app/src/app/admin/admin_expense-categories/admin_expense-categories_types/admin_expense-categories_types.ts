// RESPONSIBILITY: Type definitions and Zod form schema for admin_expense-categories (`Rule 7`, `Rule 16`, `Rule 27`, `Rule 44`).
// DATA FLOW: Types imported by Store, Hooks, Dialog, and Client Component.

import { z } from 'zod';
import { ExpenseCategoryRecord, AdminExpenseCategoriesStoreState, FetchState, ExpenseCategoryStatus, AdminExpenseCategoryFormData } from "./admin_expense-categories_types_types";

export const adminExpenseCategoryFormSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters').max(50, 'Category name is too long'),
  description: z.string().max(200, 'Description cannot exceed 200 characters').optional(),
});
