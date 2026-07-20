import { Suspense } from 'react';
// RESPONSIBILITY: Renders the Attendance page (Server Component).
import { ManagerEngagementAttendanceClient } from '@/app/manager/manager_engagement/manager_engagement_components/ManagerEngagementAttendanceClient';

export default function AttendancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerEngagementAttendanceClient />
    </Suspense>
  );
}
