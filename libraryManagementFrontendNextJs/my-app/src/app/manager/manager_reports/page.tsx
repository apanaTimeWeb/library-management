import { Suspense } from 'react';
import React from 'react';
import { ManagerReportsClient } from '@/app/manager/manager_reports/ManagerReportsClient';

// RESPONSIBILITY: Server component for the manager reports page.

export default function ManagerReportsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerReportsClient />
    </Suspense>
  );
}
