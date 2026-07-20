import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemWhatsappIntegrationClient } from '@/app/admin/admin_system/admin_system_whatsapp_integration_components/AdminSystemWhatsappIntegrationClient';

export default function WhatsAppIntegrationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemWhatsappIntegrationClient />
    </Suspense>
  );
}
