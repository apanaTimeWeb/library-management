import { useState, useMemo } from 'react';
import type { SuperadminAuditLog } from '../superadmin_audit_logs_types/SuperadminAuditLogsTypes';
import { SUPERADMIN_AUDIT_LOGS_MOCK_DATA } from '../superadmin_audit_logs_constants/SuperadminAuditLogsConstants';

export function useSuperadminAuditLogs() {
  const [actionFilter, setActionFilter] = useState('All Actions');

  const filteredLogs = useMemo(() => {
    if (actionFilter === 'All Actions') return SUPERADMIN_AUDIT_LOGS_MOCK_DATA;
    return SUPERADMIN_AUDIT_LOGS_MOCK_DATA.filter(log => log.action === actionFilter);
  }, [actionFilter]);

  return {
    actionFilter,
    setActionFilter,
    filteredLogs,
  };
}
