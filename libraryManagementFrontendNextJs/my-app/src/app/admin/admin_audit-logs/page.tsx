// RESPONSIBILITY: Server Component entry page for the admin_audit-logs module (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server page -> AdminAuditLogsClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAuditLogsClient } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsClient';
import { AdminAuditLogsSkeleton } from '@/app/admin/admin_audit-logs/admin_audit-logs_components/AdminAuditLogsSkeleton';

export default function AdminAuditLogsPage() {
  return (
    <Suspense fallback={<AdminAuditLogsSkeleton />}>
      <AdminAuditLogsClient />
    </Suspense>
  );
}
