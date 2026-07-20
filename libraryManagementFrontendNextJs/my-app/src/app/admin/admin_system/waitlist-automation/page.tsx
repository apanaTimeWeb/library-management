import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminSystemWaitlistAutomationClient } from '@/app/admin/admin_system/admin_system_waitlist_automation_components/AdminSystemWaitlistAutomationClient';

export default function WaitlistAutomationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminSystemWaitlistAutomationClient />
    </Suspense>
  );
}
