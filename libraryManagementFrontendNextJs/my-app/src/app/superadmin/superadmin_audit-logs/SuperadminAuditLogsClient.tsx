// RESPONSIBILITY: Renders the SuperadminAuditLogsClient component.
'use client';
import React, { useState } from 'react';
import { superadmin_useSuperadminAuditLogs as useSuperadminAuditLogs } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_hooks/superadmin_useSuperadminAuditLogs';
import { SuperadminAuditLogsHeader } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_components/SuperadminAuditLogsHeader';
import { SuperadminAuditLogsGrid } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_components/SuperadminAuditLogsGrid';
import { SuperadminAuditLogsPanel } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_components/SuperadminAuditLogsPanel';
import type { SuperadminAuditLog } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';

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
