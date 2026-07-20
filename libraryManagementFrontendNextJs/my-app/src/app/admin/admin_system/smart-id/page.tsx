import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemSmartIdClient } from '@/app/admin/admin_system/admin_system_smart_id_components/AdminSystemSmartIdClient';

export default function SmartIdPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemSmartIdClient />
    </Suspense>
  );
}
