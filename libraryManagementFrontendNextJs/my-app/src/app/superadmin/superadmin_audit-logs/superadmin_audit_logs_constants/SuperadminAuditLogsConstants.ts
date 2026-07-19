// RESPONSIBILITY: Renders or handles logic for SuperadminAuditLogsConstants.ts.
import type { SuperadminAuditLog } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';

export const SUPERADMIN_AUDIT_LOGS_MOCK_DATA: SuperadminAuditLog[] = [
  { id: 'log_99123', time: '11 Apr 2026, 14:30', user: 'Super Admin',  entity: 'Subscription',   target: 'City Reading Hub',    action: 'Created',       ip: '192.168.1.42', detail: 'New Enterprise (Annual) subscription created for City Reading Hub. Amount: ₹15,000.' },
  { id: 'log_99122', time: '10 Apr 2026, 09:15', user: 'System Auto',  entity: 'Payment',        target: 'REC-2026-0410',       action: 'Fee_Collected', ip: 'internal',     detail: 'Automated fee collection triggered. Invoice REC-2026-0410 marked as Paid via UPI.' },
  { id: 'log_99121', time: '09 Apr 2026, 18:45', user: 'Rahul Sharma', entity: 'Branch',         target: 'Quiet Corner Lib',    action: 'Updated',       ip: '10.0.0.5',     detail: 'Branch address updated from old address to new address. Changed by staff Rahul Sharma.' },
  { id: 'log_99120', time: '08 Apr 2026, 11:20', user: 'Super Admin',  entity: 'Support Ticket', target: 'TKT-980',             action: 'Deleted',       ip: '192.168.1.42', detail: 'Support ticket TKT-980 deleted after resolution. Reason: Duplicate entry.' },
  { id: 'log_99119', time: '05 Apr 2026, 16:05', user: 'Super Admin',  entity: 'Plan',           target: 'Enterprise (Annual)', action: 'Created',       ip: '192.168.1.42', detail: 'New SaaS plan "Enterprise (Annual)" created. Price: ₹15,000/year. Max seats: 200.' },
  { id: 'log_99118', time: '04 Apr 2026, 10:00', user: 'System Auto',  entity: 'Backup',         target: 'DB Snapshot',         action: 'Created',       ip: 'internal',     detail: 'Nightly automated backup completed successfully. Snapshot stored in AWS S3.' },
  { id: 'log_99117', time: '03 Apr 2026, 15:30', user: 'Super Admin',  entity: 'Library',        target: 'Scholar Spaces',      action: 'Updated',       ip: '192.168.1.42', detail: 'Library status changed from Active to Maintenance for scheduled renovation.' },
];

