import React from 'react';
import type { SuperadminShiftGap } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_types/SuperadminShiftGapAnalyzerTypes';

interface Props {
  shifts: SuperadminShiftGap[];
}

export function SuperadminShiftGapAnalyzerSummaryCards({ shifts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {shifts.map((m) => {
        let statusColor = 'var(--danger)';
        let statusBadgeBg = 'var(--danger-bg,rgba(248,113,113,0.1))';
        let statusBadgeBorder = 'var(--danger)';
        
        if (m.occupancyPct >= 90) {
          statusColor = 'var(--success)';
          statusBadgeBg = 'var(--success-bg,rgba(52,211,153,0.1))';
          statusBadgeBorder = 'var(--success)';
        } else if (m.occupancyPct >= 70) {
          statusColor = 'var(--warning)';
          statusBadgeBg = 'var(--warning-bg,rgba(251,191,36,0.1))';
          statusBadgeBorder = 'var(--warning)';
        }

        return (
          <div key={m.shift} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-extrabold text-[var(--text-primary)]">{m.shift}</p>
              <span 
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border/20"
                style={{ backgroundColor: statusBadgeBg, color: statusColor, borderColor: statusBadgeBorder }}
              >
                {m.occupancyPct}% full
              </span>
            </div>
            
            <div className="h-2 w-full bg-[var(--bg-input)] rounded-full overflow-hidden border border-[var(--border)]/50">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${m.occupancyPct}%`, backgroundColor: statusColor }} 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Occupied</p>
                <p className="text-lg font-extrabold text-[var(--success)]">{m.occupied}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Vacant</p>
                <p className="text-lg font-extrabold text-[var(--danger)]">{m.vacant}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Loss</p>
                <p className="text-lg font-extrabold text-[var(--warning)]">₹{m.revenueLoss.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
