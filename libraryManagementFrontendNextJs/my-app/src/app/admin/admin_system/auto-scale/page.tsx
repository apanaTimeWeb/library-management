import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemAutoScaleClient } from '@/app/admin/admin_system/admin_system_auto_scale_components/AdminSystemAutoScaleClient';

export default function AutoScalePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemAutoScaleClient />
    </Suspense>
  );
}
