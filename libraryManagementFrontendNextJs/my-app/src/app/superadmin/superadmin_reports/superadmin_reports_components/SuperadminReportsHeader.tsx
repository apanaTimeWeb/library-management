import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { SUPERADMIN_REPORTS_DATE_RANGES } from '@/app/superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';

interface Props {
  range: string;
  setRange: (r: string) => void;
}

export function SuperadminReportsHeader({ range, setRange }: Props) {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-[var(--primary)]">Reports</span>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Platform Reports & Analytics</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-md)] p-1 shadow-sm">
            {SUPERADMIN_REPORTS_DATE_RANGES.map((r: string) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-bold rounded-[var(--radius-sm)] transition-all ${
                  range === r 
                    ? 'bg-[var(--bg-input)] text-[var(--text-primary)] shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]/50'
                }`}>
                {r}
              </button>
            ))}
          </div>
          <button 
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-bold border transition-colors ${
              exported
                ? 'bg-[var(--success-bg,rgba(52,211,153,0.1))] border-[var(--success)]/20 text-[var(--success)]'
                : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-input)] hover:border-[var(--primary)]'
            }`} 
            onClick={handleExport}
          >
            {exported
              ? <><CheckCircle size={16} /> Exported!</>
              : <><Download size={16} className="text-[var(--primary)]" /> Export PDF</>}
          </button>
          <button 
            className="inline-flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-input)] hover:border-[var(--primary)] px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-bold transition-colors" 
            onClick={handleExport}
          >
            <FileSpreadsheet size={16} className="text-[var(--primary)]" /> Export Excel
          </button>
        </div>
      </div>
    </div>
  );
}
