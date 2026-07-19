// RESPONSIBILITY: Renders the SuperadminAssetsHeader component.
import React from 'react';
import { Plus } from 'lucide-react';

import type { SuperadminAssetsHeaderProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminAssetsHeader({ onAddClick }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Asset Manager</h1>
        <p className="text-sm font-medium text-text-secondary">Track all library assets and their current value.</p>
      </div>
      <button 
        className="flex items-center justify-center gap-1.5 bg-info hover:bg-info-hover text-white text-sm font-bold py-2 px-4 rounded-md transition-colors shadow-sm"
        onClick={onAddClick}
      >
        <Plus size={16} /> Add Asset
      </button>
    </div>
  );
}

