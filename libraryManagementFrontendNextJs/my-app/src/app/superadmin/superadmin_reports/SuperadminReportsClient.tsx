'use client';
// RESPONSIBILITY: Renders analytics charts and KPI cards for global platform metrics with range filtering.
// DATA FLOW: API /superadmin/reports -> SuperadminReportsClient -> KPI Grid & Chart Cards

import React, { useState, useEffect } from 'react';
import type { SuperadminReportsDataResponse, SuperadminReportsClientProps as Props } from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';
import { SuperadminReportsHeader } from '@/app/superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsHeader';
import { SuperadminReportsKpiGrid } from '@/app/superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsKpiGrid';
import { SuperadminReportsCharts } from '@/app/superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsCharts';
import { fetchSuperadminReportsData } from '@/app/superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsApi';
import { logger } from '@/lib/logger';
import type { FetchState } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_types';

export function SuperadminReportsClient({ initialData }: Props) {
  const [range, setRange] = useState('Last 6 Months');
  const [data, setData] = useState<SuperadminReportsDataResponse>(initialData);
  const [fetchState, setFetchState] = useState<FetchState>('idle');

  const loading = fetchState === 'loading';

  useEffect(() => {
    if (range === 'Last 6 Months' && data === initialData) return;

    let mounted = true;
    setFetchState('loading');
    
    fetchSuperadminReportsData(range)
      .then(res => {
        if (mounted && res.data) {
          setData(res.data);
          setFetchState('success');
        } else if (mounted) {
          setFetchState('error');
        }
      })
      .catch(err => {
        logger.error('Failed to load superadmin reports data', err);
        if (mounted) setFetchState('error');
      });

    return () => { mounted = false; };
  }, [range, initialData, data]);

  return (
    <div className="p-2 sm:p-4 relative space-y-6">
      <SuperadminReportsHeader range={range} setRange={setRange} />
      
      {loading ? (
        <div className="space-y-6 animate-pulse">
          {/* KPI Skeleton Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-bg-pageg-card border border-border rounded-lg p-4 flex flex-col justify-between">
                <div className="h-4 w-24 bg-bg-pageorder/50 rounded" />
                <div className="h-8 w-32 bg-bg-pageorder/60 rounded" />
              </div>
            ))}
          </div>
          {/* Charts Skeleton Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-bg-pageg-card border border-border rounded-lg p-6 flex flex-col justify-between">
              <div className="h-5 w-40 bg-bg-pageorder/50 rounded" />
              <div className="h-60 w-full bg-bg-pageorder/30 rounded" />
            </div>
            <div className="h-80 bg-bg-pageg-card border border-border rounded-lg p-6 flex flex-col justify-between">
              <div className="h-5 w-40 bg-bg-pageorder/50 rounded" />
              <div className="h-60 w-full bg-bg-pageorder/30 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="transition-opacity duration-300">
          <SuperadminReportsKpiGrid kpiCards={data.kpiCards} />
          <SuperadminReportsCharts data={data} />
        </div>
      )}
    </div>
  );
}
