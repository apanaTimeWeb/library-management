import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCommunicationComplaintsClient } from '@/app/admin/admin_communication/complaints/admin_communication_complaints_components/AdminCommunicationComplaintsClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCommunicationComplaintsClient />
    </Suspense>
  );
}
