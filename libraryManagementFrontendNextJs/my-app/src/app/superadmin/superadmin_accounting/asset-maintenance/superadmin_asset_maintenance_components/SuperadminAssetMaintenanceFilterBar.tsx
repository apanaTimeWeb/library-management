// RESPONSIBILITY: Renders the SuperadminAssetMaintenanceFilterBar component.
import React from 'react';

interface Props {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export function SuperadminAssetMaintenanceFilterBar({ statusFilter, setStatusFilter }: Props) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center gap-3">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Filter Status:</label>
      <select 
        className="bg-bg-input border border-border rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner w-44" 
        value={statusFilter} 
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
