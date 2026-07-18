import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminAuditLog {
  id: string;
  time: string;
  user: string;
  entity: string;
  target: string;
  action: SuperadminAuditLogAction;
  ip: string;
  detail: string;
}
export interface SuperadminAuditLogsGridProps {
  logs: SuperadminAuditLog[];
  onRowClick: (log: SuperadminAuditLog) => void;
  actionFilter: string;
  onFilterChange: (val: string) => void;
}
export interface SuperadminAuditLogsPanelProps {
  log: SuperadminAuditLog;
  onClose: () => void;
}
export type SuperadminAuditLogAction = 'Created' | 'Updated' | 'Deleted' | 'Fee_Collected' | string;
