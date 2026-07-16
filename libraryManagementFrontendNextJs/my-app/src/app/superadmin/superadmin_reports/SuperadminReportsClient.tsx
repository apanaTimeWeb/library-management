'use client';
import React, { useState, useEffect } from 'react';
import type { SuperadminReportsDataResponse } from './superadmin_reports_types/SuperadminReportsTypes';
import { SuperadminReportsHeader } from './superadmin_reports_components/SuperadminReportsHeader';
import { SuperadminReportsKpiGrid } from './superadmin_reports_components/SuperadminReportsKpiGrid';
import { SuperadminReportsCharts } from './superadmin_reports_components/SuperadminReportsCharts';
import { fetchSuperadminReportsData } from './superadmin_reports_api/SuperadminReportsApi';

interface Props {
  initialData: SuperadminReportsDataResponse;
}

export function SuperadminReportsClient({ initialData }: Props) {
  const [range, setRange] = useState('Last 6 Months');
  const [data, setData] = useState<SuperadminReportsDataResponse>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If range is exactly the default, skip re-fetching since we already have initialData
    if (range === 'Last 6 Months' && data === initialData) return;

    let mounted = true;
    setLoading(true);
    
    fetchSuperadminReportsData(range)
      .then(res => {
        if (mounted) setData(res);
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [range, initialData, data]);

  return (
    <div className="p-2 sm:p-4 relative">
      <SuperadminReportsHeader range={range} setRange={setRange} />
      
      {loading && (
        <div className="absolute inset-0 z-10 bg-[var(--bg-page)]/50 backdrop-blur-[2px] flex items-center justify-center rounded-[var(--radius-lg)]">
          <div className="bg-[var(--bg-card)] p-4 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold text-[var(--primary)] animate-pulse border border-[var(--border)]">
            <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            Loading Reports...
          </div>
        </div>
      )}

      <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity duration-300'}>
        <SuperadminReportsKpiGrid kpiCards={data.kpiCards} />
        <SuperadminReportsCharts data={data} />
      </div>
    </div>
  );
}
