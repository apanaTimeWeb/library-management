import React from 'react';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

// RESPONSIBILITY: Renders the filter controls (Date Range, Branch) and triggers state updates.

import { ManagerReportsFilterBarProps } from '@/app/manager/manager_reports/manager_reports_types/ManagerReportsTypes';

export function ManagerReportsFilterBar({ dateRange, onDateRangeChange }: ManagerReportsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 bg-card p-4 rounded-[var(--radius-lg)] border border-border shadow-sm">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Date Range
        </label>
        <ManagerSearchableDropdown
          value={dateRange}
          onChange={(v) => onDateRangeChange(v)}
          options={[
            { label: 'This Week', value: 'This Week' },
            { label: 'This Month', value: 'This Month' },
            { label: 'Last 30 Days', value: 'Last 30 Days' },
          ]}
        />
      </div>
      
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Branch
        </label>
        <div className="opacity-50 pointer-events-none">
          <ManagerSearchableDropdown
            value="HQ Branch"
            onChange={() => {}}
            options={[{ label: 'HQ Branch', value: 'HQ Branch' }]}
          />
        </div>
      </div>
    </div>
  );
}
