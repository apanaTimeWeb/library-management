// RESPONSIBILITY: Renders the SuperadminDailySettlementKpiGrid component.
import React from 'react';

import type { SuperadminDailySettlementKpiGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminDailySettlementKpiGrid({ totalCash, totalUpi, totalExp }: Props) {
  const net = totalCash + totalUpi - totalExp;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-bg-pageg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-success uppercase tracking-wider mb-1">Cash Collected</p>
        <p className="text-xl font-extrabold text-success">₹{totalCash.toLocaleString()}</p>
      </div>
      <div className="bg-bg-pageg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-info,#3B82F6 uppercase tracking-wider mb-1">UPI Collected</p>
        <p className="text-xl font-extrabold text-info,#3B82F6">₹{totalUpi.toLocaleString()}</p>
      </div>
      <div className="bg-danger-bg border border-danger/20 rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-danger uppercase tracking-wider mb-1">Expenses</p>
        <p className="text-xl font-extrabold text-danger">₹{totalExp.toLocaleString()}</p>
      </div>
      <div className="bg-bg-pageg-card border border-border rounded-lg p-4 shadow-sm flex flex-col justify-center">
        <p className="text-xs font-bold text-text-disabled uppercase tracking-wider mb-1">Net Total</p>
        <p className="text-xl font-extrabold text-text-primary">₹{net.toLocaleString()}</p>
      </div>
    </div>
  );
}

