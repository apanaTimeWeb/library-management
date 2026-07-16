// RESPONSIBILITY: Centralized constants and enums for admin_audit-logs module (Rule 3, Rule 35).
// DATA FLOW: Constants -> Hooks, Components, and Store.

import { AuditLogRecord } from '@/app/admin/admin_audit-logs/admin_audit-logs_types/admin_audit-logs_types';

export const AUDIT_LOG_TABS = ['all', 'danger', 'warning', 'info', 'success'] as const;
export type AuditLogTabType = typeof AUDIT_LOG_TABS[number];

export const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  danger:  'admin-badge admin-badge-danger',
  warning: 'admin-badge admin-badge-warning',
  info:    'admin-badge admin-badge-info',
  success: 'admin-badge admin-badge-success',
};

export const MOCK_AUDIT_LOGS: AuditLogRecord[] = [
  { id: 'L1',  action: 'Deleted Receipt',        module: 'Finance',    performedBy: 'Rahul Sharma',  role: 'Staff',   details: 'Receipt #R-1042 of ₹500 deleted',          severity: 'danger',  timestamp: '25/07/25 16:30', ip: '192.168.1.10' },
  { id: 'L2',  action: 'Student Blacklisted',     module: 'Admin',      performedBy: 'Rajesh Kumar',  role: 'Admin',   details: 'Student Vikram Patel (ID #20) blacklisted',  severity: 'danger',  timestamp: '25/07/25 15:12', ip: '192.168.1.1'  },
  { id: 'L3',  action: 'Fee Collected',           module: 'Finance',    performedBy: 'Sunita Patil',  role: 'Manager', details: '₹1,500 collected from Arjun Sharma',         severity: 'success', timestamp: '25/07/25 14:45', ip: '192.168.1.5'  },
  { id: 'L4',  action: 'Student Added',           module: 'Students',   performedBy: 'Sunita Patil',  role: 'Manager', details: 'New student Riya Kapoor admitted (Seat S9)',  severity: 'info',    timestamp: '25/07/25 13:20', ip: '192.168.1.5'  },
  { id: 'L5',  action: 'Seat Marked Maintenance', module: 'Seats',      performedBy: 'Rajesh Kumar',  role: 'Admin',   details: 'Seat S5 marked under maintenance',           severity: 'warning', timestamp: '25/07/25 12:00', ip: '192.168.1.1'  },
  { id: 'L6',  action: 'Coupon Created',          module: 'Admin',      performedBy: 'Rajesh Kumar',  role: 'Admin',   details: 'Coupon SUMMER10 created (10% off, 30 uses)', severity: 'info',    timestamp: '25/07/25 11:30', ip: '192.168.1.1'  },
  { id: 'L7',  action: 'Student Exited',          module: 'Students',   performedBy: 'Sunita Patil',  role: 'Manager', details: 'Student Mohit Arya (ID #24) marked exit',    severity: 'warning', timestamp: '25/07/25 10:15', ip: '192.168.1.5'  },
  { id: 'L8',  action: 'Refund Issued',           module: 'Finance',    performedBy: 'Rajesh Kumar',  role: 'Admin',   details: '₹500 security deposit refunded to Divya Nair', severity: 'info',  timestamp: '24/07/25 18:00', ip: '192.168.1.1'  },
  { id: 'L9',  action: 'Staff Added',             module: 'Admin',      performedBy: 'Rajesh Kumar',  role: 'Admin',   details: 'New staff Priya Joshi added (Role: Staff)',   severity: 'success', timestamp: '24/07/25 16:45', ip: '192.168.1.1'  },
  { id: 'L10', action: 'Permissions Updated',     module: 'Admin',      performedBy: 'Rajesh Kumar',  role: 'Admin',   details: 'Manager role: finance.profit access revoked', severity: 'warning', timestamp: '24/07/25 15:30', ip: '192.168.1.1'  },
];
