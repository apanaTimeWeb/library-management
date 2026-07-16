// RESPONSIBILITY: Type definitions for admin_audit-logs module (Rule 7, Rule 27, Rule 44).
// DATA FLOW: Types imported by Store, Hooks, and Components.

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export type AuditLogSeverity = 'danger' | 'warning' | 'info' | 'success';

export interface AuditLogRecord {
  id: string;
  action: string;
  module: string;
  performedBy: string;
  role: string;
  details: string;
  severity: AuditLogSeverity;
  timestamp: string;
  ip: string;
}

export interface AuditLogsFilterParams {
  search?: string;
  severity?: string;
}

export interface AdminAuditLogsStoreState {
  logs: AuditLogRecord[];
  fetchState: FetchState;
  errorMessage: string | null;
  fetchLogs: () => Promise<void>;
  setLogs: (logs: AuditLogRecord[]) => void;
  setFetchState: (state: FetchState) => void;
}
