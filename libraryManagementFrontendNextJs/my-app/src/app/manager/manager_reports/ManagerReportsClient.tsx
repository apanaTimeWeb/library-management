'use client';

import React from 'react';
import { useManagerReports } from '@/app/manager/manager_reports/manager_reports_hooks/useManagerReports';
import { ManagerReportsHeader } from '@/app/manager/manager_reports/manager_reports_components/ManagerReportsHeader';
import { ManagerReportsFilterBar } from '@/app/manager/manager_reports/manager_reports_components/ManagerReportsFilterBar';
import { ManagerReportsKpiGrid } from '@/app/manager/manager_reports/manager_reports_components/ManagerReportsKpiGrid';
import { ManagerReportsChartsGrid } from '@/app/manager/manager_reports/manager_reports_components/ManagerReportsChartsGrid';
import { ManagerReportsTablesGrid } from '@/app/manager/manager_reports/manager_reports_components/ManagerReportsTablesGrid';

// RESPONSIBILITY: Orchestrates the client-side layout and data for manager reports.
// DATA FLOW: useManagerReports -> ManagerReportsClient -> Layout Components

export function ManagerReportsClient() {
  const { data, fetchState, dateRange, setDateRange } = useManagerReports();

  if (fetchState === 'loading') {
    return (
      <div className="p-6">
        <ManagerReportsHeader />
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-[var(--skeleton-base)] rounded-[var(--radius-lg)] w-full"></div>
          <div className="h-32 bg-[var(--skeleton-base)] rounded-[var(--radius-lg)] w-full"></div>
          <div className="h-64 bg-[var(--skeleton-base)] rounded-[var(--radius-lg)] w-full"></div>
        </div>
      </div>
    );
  }

  if (fetchState === 'error' || !data) {
    return (
      <div className="p-6">
        <ManagerReportsHeader />
        <div className="p-8 text-center text-[var(--danger)] bg-[var(--danger-bg,rgba(248,113,113,0.1))] rounded-[var(--radius-lg)]">
          Failed to load reports. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ManagerReportsHeader />
      <ManagerReportsFilterBar dateRange={dateRange} onDateRangeChange={setDateRange} />
      
      <ManagerReportsKpiGrid cards={data.kpiCards} />
      <ManagerReportsChartsGrid data={data} />
      <ManagerReportsTablesGrid data={data} />
    </div>
  );
}
