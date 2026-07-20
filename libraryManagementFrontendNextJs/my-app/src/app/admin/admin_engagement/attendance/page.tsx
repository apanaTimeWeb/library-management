import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminEngagementAttendanceClient } from '@/app/admin/admin_engagement/attendance/admin_engagement_attendance_components/AdminEngagementAttendanceClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminEngagementAttendanceClient />
    </Suspense>
  );
}
