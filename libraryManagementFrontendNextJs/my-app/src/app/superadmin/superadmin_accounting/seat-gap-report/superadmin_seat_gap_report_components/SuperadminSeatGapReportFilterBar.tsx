// RESPONSIBILITY: Renders the SuperadminSeatGapReportFilterBar component.
import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';

import type { SuperadminSeatGapReportFilterBarProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';

export function SuperadminSeatGapReportFilterBar({ shiftFilter, setShiftFilter, statusFilter, setStatusFilter, onExport }: Props) {
  const [exporting, setExporting] = useState(false);

  const handleExportClick = async () => {
    setExporting(true);
    await onExport();
    setExporting(false);
  };

  return (
    <div className="bg-bg-pageg-card border border-border rounded-lg p-4 shadow-sm mb-6 flex flex-wrap items-center gap-3">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mr-1">Filters:</label>
      <div className="min-w-36">
        <SuperadminSearchableDropdown
          options={[
            { label: 'All Shifts', value: 'all' },
            { label: 'Morning', value: 'Morning' },
            { label: 'Afternoon', value: 'Afternoon' },
            { label: 'Night', value: 'Night' }
          ]}
          value={shiftFilter}
          onChange={setShiftFilter}
        />
      </div>
      
      <div className="min-w-36">
        <SuperadminSearchableDropdown
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Vacant', value: 'vacant' },
            { label: 'Maintenance', value: 'maintenance' }
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <button 
        className="ml-auto flex items-center gap-2 bg-bg-pageg-input hover:bg-bg-pageorder border border-border text-text-primary text-xs font-bold py-1.5 px-3 rounded-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        onClick={handleExportClick}
        disabled={exporting}
      >
        {exporting ? <Loader size={14} className="animate-spin" /> : <Download size={14} />}
        Export
      </button>
    </div>
  );
}
