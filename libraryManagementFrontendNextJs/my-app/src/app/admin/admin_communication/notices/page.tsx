import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCommunicationNoticesClient } from '@/app/admin/admin_communication/notices/admin_communication_notices_components/AdminCommunicationNoticesClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCommunicationNoticesClient />
    </Suspense>
  );
}
