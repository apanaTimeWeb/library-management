import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerEngagementAbsenteeReportClient } from '@/app/manager/manager_engagement/manager_engagement_components/ManagerEngagementAbsenteeReportClient';

export default function AbsenteeReportPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerEngagementAbsenteeReportClient />
    </Suspense>
  );
}

