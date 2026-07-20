import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminEngagementAbsenteeReportClient } from '@/app/admin/admin_engagement/absentee-report/admin_engagement_absentee_report_components/AdminEngagementAbsenteeReportClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminEngagementAbsenteeReportClient />
    </Suspense>
  );
}
