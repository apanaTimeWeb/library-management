import { AuditLogTabType, AuditLogRecord } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';

export const AUDIT_LOG_TABS: AuditLogTabType[] = ['all', 'danger', 'warning', 'info', 'success'];

export const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  danger: 'bg-danger/10 text-danger border-none',
  warning: 'bg-warning/10 text-warning border-none',
  info: 'bg-info/10 text-info border-none',
  success: 'bg-success/10 text-success border-none',
};

export const MOCK_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'LOG-77382',
    action: 'Deleted User',
    module: 'Authentication',
    performedBy: 'John Doe',
    role: 'Superadmin',
    details: 'Permanently deleted user account "jane.smith@example.com".',
    severity: 'danger',
    timestamp: '2026-07-17T14:30:00Z',
    ip: '192.168.1.15',
  },
  {
    id: 'LOG-77381',
    action: 'Suspended Branch',
    module: 'Branches',
    performedBy: 'Alice Johnson',
    role: 'Admin',
    details: 'Suspended "Kothrud Center" due to outstanding payments.',
    severity: 'danger',
    timestamp: '2026-07-17T13:15:00Z',
    ip: '192.168.1.42',
  },
  {
    id: 'LOG-77380',
    action: 'Configuration Changed',
    module: 'Settings',
    performedBy: 'Bob Builder',
    role: 'Admin',
    details: 'Changed global timezone from "Asia/Kolkata" to "UTC".',
    severity: 'warning',
    timestamp: '2026-07-17T12:00:00Z',
    ip: '192.168.1.99',
  },
  {
    id: 'LOG-77379',
    action: 'User Logged In',
    module: 'Authentication',
    performedBy: 'Charlie Brown',
    role: 'Manager',
    details: 'User logged in successfully via Google SSO.',
    severity: 'info',
    timestamp: '2026-07-17T11:45:00Z',
    ip: '192.168.1.201',
  },
  {
    id: 'LOG-77378',
    action: 'Role Promoted',
    module: 'Permissions',
    performedBy: 'Super Admin',
    role: 'Superadmin',
    details: 'Promoted "charlie.brown@example.com" to Manager.',
    severity: 'success',
    timestamp: '2026-07-17T10:30:00Z',
    ip: '192.168.1.1',
  },
];
