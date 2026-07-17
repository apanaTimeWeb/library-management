// RESPONSIBILITY: Renders the SuperadminSeatGapReportFilterBar component.
import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';

interface Props {
  shiftFilter: string;
  setShiftFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onExport: () => Promise<void>;
}

export function SuperadminSeatGapReportFilterBar({ shiftFilter, setShiftFilter, statusFilter, setStatusFilter, onExport }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExportClick = async () => {
    setExporting(true);
    await onExport();
    setExporting(false);
  };

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex flex-wrap items-center gap-3">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mr-1">Filters:</label>
      <select 
        className="bg-bg-input border border-border rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner min-w-36" 
        value={shiftFilter} 
        onChange={e => setShiftFilter(e.target.value)}
      >
        <option value="all">All Shifts</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Night">Night</option>
      </select>
      
      <select 
        className="bg-bg-input border border-border rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors shadow-inner min-w-36" 
        value={statusFilter} 
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="vacant">Vacant</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <button 
        className="ml-auto flex items-center gap-2 bg-bg-input hover:bg-border border border-border text-text-primary text-xs font-bold py-1.5 px-3 rounded-[var(--radius-sm)] transition-colors shadow-sm disabled:opacity-50"
        onClick={handleExportClick}
        disabled={exporting}
      >
        {exporting ? <Loader size={14} className="animate-spin" /> : <Download size={14} />}
        Export
      </button>
    </div>
  );
}
