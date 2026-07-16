import React from 'react';
import { Armchair } from 'lucide-react';
import type { SuperadminGapRow } from '../superadmin_seat_gap_report_types/SuperadminSeatGapReportTypes';
import { SUPERADMIN_SEAT_GAP_REPORT_STATUS_STYLES } from '../superadmin_seat_gap_report_constants/SuperadminSeatGapReportConstants';

interface Props {
  rows: SuperadminGapRow[];
}

export function SuperadminSeatGapReportTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <Armchair size={48} className="text-[var(--text-disabled)] mb-4 opacity-50" />
        <p className="text-lg font-bold text-[var(--text-primary)] mb-1">No gap seats found.</p>
        <p className="text-sm font-medium text-[var(--text-secondary)]">All seats seem to be occupied based on the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--bg-page)]/50 border-b border-[var(--border)]">
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Seat No</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Shift</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Floor</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Last Occupied</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider text-right">Gap Days</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider text-right">Revenue Loss ₹</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((r, i) => (
            <tr key={`${r.seatNo}-${i}`} className="hover:bg-[var(--bg-page)]/30 transition-colors">
              <td className="py-3.5 px-4 text-sm font-extrabold text-[var(--text-primary)]">{r.seatNo}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-[var(--text-secondary)]">{r.shift}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-[var(--text-secondary)]">{r.floor}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-[var(--text-secondary)]">{r.lastOccupied}</td>
              <td className={`py-3.5 px-4 text-[15px] font-extrabold tracking-tight text-right ${r.gapDays > 20 ? 'text-[var(--danger)]' : 'text-[var(--warning)]'}`}>
                {r.gapDays}d
              </td>
              <td className="py-3.5 px-4 text-[15px] font-extrabold text-[var(--danger)] tracking-tight text-right">₹{r.revenueLoss.toLocaleString()}</td>
              <td className="py-3.5 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm ${SUPERADMIN_SEAT_GAP_REPORT_STATUS_STYLES[r.status] || ''}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
