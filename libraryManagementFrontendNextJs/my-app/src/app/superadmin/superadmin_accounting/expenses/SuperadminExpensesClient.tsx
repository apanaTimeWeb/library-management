'use client';
import React, { useState } from 'react';
import { useSuperadminExpenses } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_hooks/useSuperadminExpenses';
import { SuperadminExpensesHeader } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesHeader';
import { SuperadminExpensesKpiGrid } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesKpiGrid';
import { SuperadminExpensesFilterBar } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesFilterBar';
import { SuperadminExpensesGrid } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesGrid';
import { SuperadminExpensesAddDialog } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesAddDialog';

export function SuperadminExpensesClient() {
  const { expenses, visibleExpenses, catFilter, setCatFilter, categories, handleAdd, handleDelete } = useSuperadminExpenses();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const onAddExpense = async (exp: any) => {
    await handleAdd(exp);
    showToast('✅ Expense recorded successfully');
  };

  const onDeleteExpense = async (id: number) => {
    await handleDelete(id);
    showToast('✅ Expense deleted');
  };

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-[var(--bg-card)] border border-[var(--border)] shadow-xl rounded-[var(--radius-md)] px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-[var(--text-primary)]">{toast}</span>
        </div>
      )}

      {showAdd && (
        <SuperadminExpensesAddDialog 
          categories={categories} 
          onClose={() => setShowAdd(false)} 
          onSave={onAddExpense} 
        />
      )}

      <SuperadminExpensesHeader onAddClick={() => setShowAdd(true)} />
      <SuperadminExpensesKpiGrid allExpenses={expenses} visibleExpenses={visibleExpenses} />
      <SuperadminExpensesFilterBar categories={categories} catFilter={catFilter} setCatFilter={setCatFilter} />
      <SuperadminExpensesGrid expenses={visibleExpenses} onDelete={onDeleteExpense} />
    </div>
  );
}
