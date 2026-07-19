'use client';
// RESPONSIBILITY: Renders the SuperadminExpensesClient component.
import React, { useState } from 'react';
import { Superadminsuperadmin_useSuperadminExpenses as useSuperadminExpenses } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_hooks/Superadminsuperadmin_useSuperadminExpenses';
import { SuperadminExpensesHeader } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesHeader';
import { SuperadminExpensesKpiGrid } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesKpiGrid';
import { SuperadminExpensesFilterBar } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesFilterBar';
import { SuperadminExpensesGrid } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesGrid';
import { SuperadminExpensesAddDialog } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_components/SuperadminExpensesAddDialog';

export function SuperadminExpensesClient() {
  const { 
    expenses, 
    visibleExpenses, 
    catFilter, 
    setCatFilter, 
    categories, 
    handleAdd, 
    handleDelete,
    showAdd,
    setShowAdd,
    toast
  } = useSuperadminExpenses();

  return (
    <div className="relative p-2 sm:p-4">
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className="text-sm font-semibold text-text-primary">{toast}</span>
        </div>
      )}

      {showAdd && (
        <SuperadminExpensesAddDialog 
          categories={categories} 
          onClose={() => setShowAdd(false)} 
          onSave={handleAdd} 
        />
      )}

      <SuperadminExpensesHeader onAddClick={() => setShowAdd(true)} />
      <SuperadminExpensesKpiGrid allExpenses={expenses} visibleExpenses={visibleExpenses} />
      <SuperadminExpensesFilterBar categories={categories} catFilter={catFilter} setCatFilter={setCatFilter} />
      <SuperadminExpensesGrid expenses={visibleExpenses} onDelete={handleDelete} />
    </div>
  );
}
