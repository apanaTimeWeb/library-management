import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemMaintenanceClient } from '@/app/admin/admin_system/admin_system_maintenance_components/AdminSystemMaintenanceClient';

export default function MaintenancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemMaintenanceClient />
    </Suspense>
  );
}
