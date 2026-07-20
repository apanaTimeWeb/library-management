import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component.
import { ManagerEngagementHolidayCalendarClient } from '@/app/manager/manager_engagement/manager_engagement_components/ManagerEngagementHolidayCalendarClient';

export default function HolidayCalendarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerEngagementHolidayCalendarClient />
    </Suspense>
  );
}

