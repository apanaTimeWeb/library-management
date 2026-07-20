import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminEngagementHolidayCalendarClient } from '@/app/admin/admin_engagement/holiday-calendar/admin_engagement_holiday_calendar_components/AdminEngagementHolidayCalendarClient';

export default function page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminEngagementHolidayCalendarClient />
    </Suspense>
  );
}
