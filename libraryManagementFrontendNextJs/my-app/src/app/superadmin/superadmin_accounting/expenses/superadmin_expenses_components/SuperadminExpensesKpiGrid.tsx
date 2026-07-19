// RESPONSIBILITY: Renders the SuperadminExpensesKpiGrid component.
import React from 'react';
import type { SuperadminExpense } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';

import type { SuperadminExpensesKpiGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminExpensesKpiGrid({ allExpenses, visibleExpenses }: Props) {
  const total = allExpenses.reduce((s, e) => s + e.amount, 0);
  const visibleTotal = visibleExpenses.reduce((s, e) => s + e.amount, 0);
  const categoriesCount = new Set(allExpenses.map(( e: SuperadminExpense ) => e.category)).size;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">Total Expenses</p>
        <p className="text-xl font-extrabold text-danger">â‚¹{total.toLocaleString()}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">This Month</p>
        <p className="text-xl font-extrabold text-text-primary">â‚¹{visibleTotal.toLocaleString()}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">Entries</p>
        <p className="text-xl font-extrabold text-text-primary">{allExpenses.length}</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">Categories</p>
        <p className="text-xl font-extrabold text-text-primary">{categoriesCount}</p>
      </div>
    </div>
  );
}
