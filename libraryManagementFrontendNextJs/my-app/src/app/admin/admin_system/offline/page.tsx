import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemOfflineClient } from '@/app/admin/admin_system/admin_system_offline_components/AdminSystemOfflineClient';

export default function OfflinePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemOfflineClient />
    </Suspense>
  );
}
