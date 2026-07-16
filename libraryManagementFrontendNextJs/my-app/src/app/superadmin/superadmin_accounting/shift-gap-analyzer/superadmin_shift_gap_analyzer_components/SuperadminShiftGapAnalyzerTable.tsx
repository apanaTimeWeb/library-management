import React from 'react';
import { CalendarX2 } from 'lucide-react';
import type { SuperadminDayGap } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_types/SuperadminShiftGapAnalyzerTypes';

interface Props {
  days: SuperadminDayGap[];
}

export function SuperadminShiftGapAnalyzerTable({ days }: Props) {
  if (days.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <CalendarX2 size={48} className="text-[var(--text-disabled)] mb-4 opacity-50" />
        <p className="text-lg font-bold text-[var(--text-primary)] mb-1">No day-wise gaps found.</p>
        <p className="text-sm font-medium text-[var(--text-secondary)]">The selected shift does not have any recorded day-wise gaps.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--bg-page)]/50 border-b border-[var(--border)]">
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Date</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Shift</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Seat No</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider text-right">Gap Days</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider text-right">Revenue Loss ₹</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {days.map((d, i) => (
            <tr key={i} className="hover:bg-[var(--bg-page)]/30 transition-colors">
              <td className="py-3.5 px-4 text-sm font-medium text-[var(--text-secondary)]">{d.date}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm">
                  {d.shift}
                </span>
              </td>
              <td className="py-3.5 px-4 text-sm font-extrabold text-[var(--text-primary)]">{d.seatNo}</td>
              <td className={`py-3.5 px-4 text-[15px] font-extrabold tracking-tight text-right ${d.gapDays > 20 ? 'text-[var(--danger)]' : 'text-[var(--warning)]'}`}>
                {d.gapDays}d
              </td>
              <td className="py-3.5 px-4 text-[15px] font-extrabold text-[var(--danger)] tracking-tight text-right">₹{d.loss.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
