'use client';
import React, { useState } from 'react';
import { useSuperadminAuditLogs } from './superadmin_audit_logs_hooks/useSuperadminAuditLogs';
import { SuperadminAuditLogsHeader } from './superadmin_audit_logs_components/SuperadminAuditLogsHeader';
import { SuperadminAuditLogsGrid } from './superadmin_audit_logs_components/SuperadminAuditLogsGrid';
import { SuperadminAuditLogsPanel } from './superadmin_audit_logs_components/SuperadminAuditLogsPanel';
import type { SuperadminAuditLog } from './superadmin_audit_logs_types/SuperadminAuditLogsTypes';

export function SuperadminAuditLogsClient() {
  const { actionFilter, setActionFilter, filteredLogs } = useSuperadminAuditLogs();
  const [selected, setSelected] = useState<SuperadminAuditLog | null>(null);

  return (
    <div className="relative p-2 sm:p-4">
      {selected && (
        <SuperadminAuditLogsPanel 
          log={selected} 
          onClose={() => setSelected(null)} 
        />
      )}

      <SuperadminAuditLogsHeader />
      <SuperadminAuditLogsGrid 
        logs={filteredLogs} 
        onRowClick={setSelected} 
        actionFilter={actionFilter}
        onFilterChange={setActionFilter}
      />
    </div>
  );
}
