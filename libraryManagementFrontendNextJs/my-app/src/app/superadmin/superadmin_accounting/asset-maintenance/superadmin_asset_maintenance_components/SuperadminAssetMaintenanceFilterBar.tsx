// RESPONSIBILITY: Renders the SuperadminAssetMaintenanceFilterBar component.
import React from 'react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

interface Props {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export function SuperadminAssetMaintenanceFilterBar({ statusFilter, setStatusFilter }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center gap-3">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Filter Status:</label>
      <div className="w-44">
        <SuperadminSearchableDropdown
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' }
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>
    </div>
  );
}
