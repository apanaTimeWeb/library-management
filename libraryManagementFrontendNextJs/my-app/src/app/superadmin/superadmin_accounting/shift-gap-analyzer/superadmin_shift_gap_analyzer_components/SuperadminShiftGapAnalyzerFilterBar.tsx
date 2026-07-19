// RESPONSIBILITY: Renders the SuperadminShiftGapAnalyzerFilterBar component.
import React from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

import type { SuperadminShiftGapAnalyzerFilterBarProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminShiftGapAnalyzerFilterBar({ shiftFilter, setShiftFilter }: Props) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm mb-6 flex items-center justify-between gap-3">
      <h3 className="text-sm font-bold text-text-primary tracking-wide">Day-wise Gap Log</h3>
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider hidden sm:block">Filter:</label>
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Shifts', value: 'all' },
              { label: 'Morning', value: 'Morning' },
              { label: 'Afternoon', value: 'Afternoon' },
              { label: 'Night', value: 'Night' }
            ]}
            value={shiftFilter}
            onChange={setShiftFilter}
          />
        </div>
      </div>
    </div>
  );
}
