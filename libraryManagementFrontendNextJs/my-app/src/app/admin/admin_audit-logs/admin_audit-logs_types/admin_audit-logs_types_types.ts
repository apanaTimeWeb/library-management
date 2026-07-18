import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
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
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type AuditLogSeverity = 'danger' | 'warning' | 'info' | 'success';
export type AuditLogTabType = 'all' | AuditLogSeverity;
