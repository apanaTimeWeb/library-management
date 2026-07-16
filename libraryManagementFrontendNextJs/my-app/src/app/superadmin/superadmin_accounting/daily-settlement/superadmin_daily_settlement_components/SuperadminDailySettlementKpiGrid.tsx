import React from 'react';

interface Props {
  totalCash: number;
  totalUpi: number;
  totalExp: number;
}

export function SuperadminDailySettlementKpiGrid({ totalCash, totalUpi, totalExp }: Props) {
  const net = totalCash + totalUpi - totalExp;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-success uppercase tracking-wider mb-1">Cash Collected</p>
        <p className="text-xl font-extrabold text-success">₹{totalCash.toLocaleString()}</p>
      </div>
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-info,#3B82F6 uppercase tracking-wider mb-1">UPI Collected</p>
        <p className="text-xl font-extrabold text-info,#3B82F6">₹{totalUpi.toLocaleString()}</p>
      </div>
      <div className="bg-danger-bg border border-danger/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-danger uppercase tracking-wider mb-1">Expenses</p>
        <p className="text-xl font-extrabold text-danger">₹{totalExp.toLocaleString()}</p>
      </div>
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wider mb-1">Net Total</p>
        <p className="text-xl font-extrabold text-text-primary">₹{net.toLocaleString()}</p>
      </div>
    </div>
  );
}

