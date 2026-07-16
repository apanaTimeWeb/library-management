import { useState, useMemo } from 'react';
import type { SuperadminExpense } from '../superadmin_expenses_types/SuperadminExpensesTypes';
import { SUPERADMIN_EXPENSES_MOCK_DATA, SUPERADMIN_EXPENSES_CATEGORIES } from '../superadmin_expenses_constants/SuperadminExpensesConstants';

export function useSuperadminExpenses() {
  const [expenses, setExpenses] = useState<SuperadminExpense[]>(SUPERADMIN_EXPENSES_MOCK_DATA);
  const [catFilter, setCatFilter] = useState('all');

  const visibleExpenses = useMemo(() => {
    if (catFilter === 'all') return expenses;
    return expenses.filter(e => e.category === catFilter);
  }, [expenses, catFilter]);

  const handleAdd = async (newExp: Omit<SuperadminExpense, 'id'>) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    const expWithId = { ...newExp, id: Date.now() };
    setExpenses(prev => [expWithId, ...prev]);
  };

  const handleDelete = async (id: number) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return {
    expenses,
    visibleExpenses,
    catFilter,
    setCatFilter,
    categories: SUPERADMIN_EXPENSES_CATEGORIES,
    handleAdd,
    handleDelete,
  };
}
