import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCommunicationWhatsappTemplatesClient } from '@/app/admin/admin_communication/whatsapp-templates/admin_communication_whatsapp_templates_components/AdminCommunicationWhatsappTemplatesClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCommunicationWhatsappTemplatesClient />
    </Suspense>
  );
}
