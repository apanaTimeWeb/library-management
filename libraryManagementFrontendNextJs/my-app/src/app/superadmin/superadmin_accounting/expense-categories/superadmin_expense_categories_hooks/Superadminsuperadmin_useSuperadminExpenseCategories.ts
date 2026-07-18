import { useState } from 'react';
import type { SuperadminExpenseCategory } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_types/SuperadminExpenseCategoriesTypes';
import { SUPERADMIN_EXPENSE_CATEGORIES_MOCK_DATA, SUPERADMIN_EXPENSE_CATEGORIES_COLORS } from '@/app/superadmin/superadmin_accounting/expense-categories/superadmin_expense_categories_constants/SuperadminExpenseCategoriesConstants';

// DATA FLOW: API → useSuperadminExpenseCategories.ts → SuperadminExpenseCategoriesComponent
export function Superadminsuperadmin_useSuperadminExpenseCategories() {
  const [categories, setCategories] = useState<SuperadminExpenseCategory[]>(SUPERADMIN_EXPENSE_CATEGORIES_MOCK_DATA);

  const handleAdd = async (newCategory: Omit<SuperadminExpenseCategory, 'id' | 'spent'>) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    const catWithId = { ...newCategory, id: Date.now(), spent: 0 };
    setCategories(prev => [...prev, catWithId]);
  };

  const handleDelete = async (id: number) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return {
    categories,
    availableColors: SUPERADMIN_EXPENSE_CATEGORIES_COLORS,
    handleAdd,
    handleDelete,
  };
}
