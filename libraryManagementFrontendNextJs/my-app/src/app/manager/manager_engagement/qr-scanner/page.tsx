import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerEngagementQrScannerClient } from '@/app/manager/manager_engagement/manager_engagement_components/ManagerEngagementQrScannerClient';

export default function QrScannerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerEngagementQrScannerClient />
    </Suspense>
  );
}

