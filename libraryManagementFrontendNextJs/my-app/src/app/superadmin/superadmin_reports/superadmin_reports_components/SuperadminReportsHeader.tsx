// RESPONSIBILITY: Renders the SuperadminReportsHeader component.
import React, { useState } from 'react';
import { Download, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { SUPERADMIN_REPORTS_DATE_RANGES } from '@/app/superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';
import type { SuperadminReportsHeaderProps as Props } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';

export function SuperadminReportsHeader({ range, setRange }: Props) {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-xs font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">Reports</span>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Platform Reports & Analytics</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-card border border-border rounded-md p-1 shadow-sm">
            {SUPERADMIN_REPORTS_DATE_RANGES.map((r: string) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-all ${
                  range === r 
                    ? 'bg-input text-text-primary shadow-sm' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-input/50'
                }`}>
                {r}
              </button>
            ))}
          </div>
          <button 
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold border transition-colors ${
              exported
                ? 'bg-success-bg border-success/20 text-success'
                : 'bg-card border-border text-text-primary hover:bg-input hover:border-primary'
            }`} 
            onClick={handleExport}
          >
            {exported
              ? <><CheckCircle size={16} /> Exported!</>
              : <><Download size={16} className="text-primary" /> Export PDF</>}
          </button>
          <button 
            className="inline-flex items-center gap-2 bg-card border border-border text-text-primary hover:bg-input hover:border-primary px-4 py-2.5 rounded-md text-sm font-bold transition-colors" 
            onClick={handleExport}
          >
            <FileSpreadsheet size={16} className="text-primary" /> Export Excel
          </button>
        </div>
      </div>
    </div>
  );
}

