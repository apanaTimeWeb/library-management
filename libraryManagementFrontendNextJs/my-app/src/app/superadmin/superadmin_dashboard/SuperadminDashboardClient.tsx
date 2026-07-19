'use client';
// RESPONSIBILITY: Renders the SuperadminDashboardClient component.
import React from 'react';
import type { SuperadminDashboardDataResponse, SuperadminDashboardClientProps as Props } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { SuperadminDashboardHeader } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardHeader';
import { SuperadminDashboardKpiCard } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardKpiCard';
import { SuperadminDashboardSystemHealthPanel } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardSystemHealthPanel';
import { SuperadminDashboardActionItemsPanel } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardActionItemsPanel';
import { SuperadminDashboardRecentLibrariesTable } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardRecentLibrariesTable';
import { SuperadminDashboardRecentActivity } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardRecentActivity';

export function SuperadminDashboardClient({ initialData }: Props) {
  if (!initialData) {
    return (
      <div className="p-8 text-center bg-danger-bg text-danger rounded-lg">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <>
      <SuperadminDashboardHeader />

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {initialData.kpiCards?.map((card, i) => (
          <SuperadminDashboardKpiCard key={i} {...card} />
        ))}
      </div>

      {/* Row 2: System Health + Action Items */}
      <div className="grid grid-cols-12 gap-8 mb-8">
        <SuperadminDashboardSystemHealthPanel data={initialData.systemHealth} />
        <SuperadminDashboardActionItemsPanel data={initialData.actionItems || []} />
      </div>

      {/* Row 3: Libraries Table */}
      <SuperadminDashboardRecentLibrariesTable data={initialData.recentLibraries || []} />

      {/* Row 4: Recent Platform Activity */}
      <SuperadminDashboardRecentActivity />
    </>
  );
}

