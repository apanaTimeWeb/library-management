// RESPONSIBILITY: Renders the SuperadminAssetsFilterBar component.
import React from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

import type { SuperadminAssetsFilterBarProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminAssetsFilterBar({ categories, catFilter, setCatFilter }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center gap-3">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Filter Category:</label>
      <div className="min-w-40">
        <SuperadminSearchableDropdown
          options={[
            { label: 'All Categories', value: 'all' },
            ...categories.map(c => ({ label: c, value: c }))
          ]}
          value={catFilter}
          onChange={setCatFilter}
        />
      </div>
    </div>
  );
}
