import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCommunicationWhatsappLogsClient } from '@/app/admin/admin_communication/whatsapp-logs/admin_communication_whatsapp_logs_components/AdminCommunicationWhatsappLogsClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCommunicationWhatsappLogsClient />
    </Suspense>
  );
}
