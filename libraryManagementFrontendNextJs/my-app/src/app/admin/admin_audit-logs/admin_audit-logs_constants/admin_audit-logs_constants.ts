import { AuditLogTabType } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';

export const AUDIT_LOG_TABS: AuditLogTabType[] = ['all', 'danger', 'warning', 'info', 'success'];

export const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  danger: 'bg-danger/10 text-danger border-none',
  warning: 'bg-warning/10 text-warning border-none',
  info: 'bg-info/10 text-info border-none',
  success: 'bg-success/10 text-success border-none',
};
