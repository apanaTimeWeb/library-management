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
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--success)] uppercase tracking-wider mb-1">Cash Collected</p>
        <p className="text-xl font-extrabold text-[var(--success)]">₹{totalCash.toLocaleString()}</p>
      </div>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--info,#3B82F6)] uppercase tracking-wider mb-1">UPI Collected</p>
        <p className="text-xl font-extrabold text-[var(--info,#3B82F6)]">₹{totalUpi.toLocaleString()}</p>
      </div>
      <div className="bg-[var(--danger-bg,rgba(248,113,113,0.1))] border border-[var(--danger)]/20 rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--danger)] uppercase tracking-wider mb-1">Expenses</p>
        <p className="text-xl font-extrabold text-[var(--danger)]">₹{totalExp.toLocaleString()}</p>
      </div>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center">
        <p className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider mb-1">Net Total</p>
        <p className="text-xl font-extrabold text-[var(--text-primary)]">₹{net.toLocaleString()}</p>
      </div>
    </div>
  );
}
