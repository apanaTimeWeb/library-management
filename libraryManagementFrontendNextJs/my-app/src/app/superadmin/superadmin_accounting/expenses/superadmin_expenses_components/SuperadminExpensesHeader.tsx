// RESPONSIBILITY: Renders the SuperadminExpensesHeader component.
import React from 'react';
import { Plus } from 'lucide-react';

import type { SuperadminExpensesHeaderProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminExpensesHeader({ onAddClick }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-text-primaryxl font-extrabold text-text-primary tracking-tight">Expense Ledger</h1>
        <p className="text-sm font-medium text-text-secondary">Track all library operational expenses.</p>
      </div>
      <button 
        className="flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 px-4 rounded-md transition-colors shadow-sm" 
        onClick={onAddClick}
      >
        <Plus size={16} /> Add Expense
      </button>
    </div>
  );
}
