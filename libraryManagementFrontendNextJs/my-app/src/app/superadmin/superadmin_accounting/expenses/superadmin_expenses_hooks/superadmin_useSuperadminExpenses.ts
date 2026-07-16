import { useState, useMemo } from 'react';
import type { SuperadminExpense } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';
import { SUPERADMIN_EXPENSES_MOCK_DATA, SUPERADMIN_EXPENSES_CATEGORIES } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_constants/SuperadminExpensesConstants';

// DATA FLOW: API → useSuperadminExpenses.ts → SuperadminExpensesComponent
export function superadmin_useSuperadminExpenses() {
  const [expenses, setExpenses] = useState<SuperadminExpense[]>(SUPERADMIN_EXPENSES_MOCK_DATA);
  const [catFilter, setCatFilter] = useState('all');

  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { 
    setToast(msg); 
    setTimeout(() => setToast(''), 2500); 
  };

  const visibleExpenses = useMemo(() => {
    if (catFilter === 'all') return expenses;
    return expenses.filter((e: unknown) => e.category === catFilter);
  }, [expenses, catFilter]);

  const handleAdd = async (newExp: Omit<SuperadminExpense, 'id'>) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    const expWithId = { ...newExp, id: Date.now() };
    setExpenses(prev => [expWithId, ...prev]);
    showToast('✅ Expense recorded successfully');
  };

  const handleDelete = async (id: number) => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 800));
    setExpenses(prev => prev.filter((e: unknown) => e.id !== id));
    showToast('✅ Expense deleted');
  };

  return {
    expenses,
    visibleExpenses,
    catFilter,
    setCatFilter,
    categories: SUPERADMIN_EXPENSES_CATEGORIES,
    handleAdd,
    handleDelete,
    showAdd,
    setShowAdd,
    toast,
  };
}
