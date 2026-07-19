// RESPONSIBILITY: Renders the SuperadminDailySettlementHeader component.
import React from 'react';

import type { SuperadminDailySettlementHeaderProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminDailySettlementHeader({ date, setDate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Daily Settlement</h1>
        <p className="text-sm font-medium text-text-secondary">Shift-wise cash & UPI reconciliation.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Settlement Date</label>
        <input 
          type="date" 
          className="w-full sm:w-44 bg-input border border-border rounded-md py-2 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
      </div>
    </div>
  );
}
