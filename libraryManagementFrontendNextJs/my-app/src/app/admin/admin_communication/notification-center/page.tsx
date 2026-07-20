import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminCommunicationNotificationCenterClient } from '@/app/admin/admin_communication/notification-center/admin_communication_notification_center_components/AdminCommunicationNotificationCenterClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminCommunicationNotificationCenterClient />
    </Suspense>
  );
}
