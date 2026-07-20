import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemGapFillingClient } from '@/app/admin/admin_system/admin_system_gap_filling_components/AdminSystemGapFillingClient';

export default function GapFillingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemGapFillingClient />
    </Suspense>
  );
}
