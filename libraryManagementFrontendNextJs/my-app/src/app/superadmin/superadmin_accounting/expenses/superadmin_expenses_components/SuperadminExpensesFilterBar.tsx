// RESPONSIBILITY: Renders the SuperadminExpensesFilterBar component.
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

import type { SuperadminExpensesFilterBarProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export function SuperadminExpensesFilterBar({ categories, catFilter, setCatFilter }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-bg-card border border-border rounded-[var(--radius-lg)] shadow-sm mb-6">
      <div className="flex flex-col gap-1.5 w-full sm:w-48">
        <label className="text-[11px] font-bold text-text-disabled uppercase tracking-wider">Filter by Category</label>
        <SuperadminSearchableDropdown
          options={[
            { label: 'All Categories', value: 'all' },
            ...categories.map(c => ({ label: c, value: c }))
          ]}
          value={catFilter}
          onChange={setCatFilter}
        />
      </div>
      <button 
        className="flex items-center justify-center gap-2 bg-bg-page border border-border hover:bg-bg-input hover:border-primary text-text-primary text-sm font-bold py-2 px-4 rounded-[var(--radius-md)] transition-colors shadow-sm mt-auto cursor-pointer" 
        onClick={() => router.push(SUPERADMIN_ROUTES.ACCOUNTING_EXPENSE_CATEGORIES)}
      >
        <TrendingUp size={14} className="text-primary" /> View Categories
      </button>
    </div>
  );
}
