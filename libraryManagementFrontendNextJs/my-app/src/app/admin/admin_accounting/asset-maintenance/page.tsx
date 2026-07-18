// RESPONSIBILITY: Server Component entry page for admin_accounting asset maintenance (`Rule 8`, `Rule 38`).
// DATA FLOW: Next.js App Router -> Server page -> AdminAssetMaintenanceClient (`Rule 39`).

import { Suspense } from 'react';
import { AdminAssetMaintenanceClient } from '@/app/admin/admin_accounting/asset-maintenance/admin_asset_maintenance_components/AdminAssetMaintenanceClient';

export default function AdminAssetMaintenancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Loading Asset Maintenance...</div>}>
      <AdminAssetMaintenanceClient />
    </Suspense>
  );
}
