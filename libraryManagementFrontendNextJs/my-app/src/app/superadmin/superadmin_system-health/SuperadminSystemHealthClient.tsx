'use client';
// RESPONSIBILITY: Renders real-time system health metrics, infrastructure status, and gateway performance for Superadmin.
// DATA FLOW: API /superadmin/system-health -> SuperadminSystemHealthClient -> Health Metric Cards

import React, { useState } from 'react';
import { Server, Database } from 'lucide-react';
import type { SuperadminSystemHealthDataResponse, SuperadminSystemHealthClientProps } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';

import { SuperadminSystemHealthHeader } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_components/SuperadminSystemHealthHeader';
import { SuperadminSystemHealthMetricCard } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_components/SuperadminSystemHealthMetricCard';
import { SuperadminSystemHealthGatewaysCard } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_components/SuperadminSystemHealthGatewaysCard';
import { fetchSuperadminSystemHealthData } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_api/SuperadminSystemHealthApi';
import { logger } from '@/lib/logger';
import type { FetchState } from '@/app/superadmin/superadmin_shared_components/superadmin_types';

export function SuperadminSystemHealthClient({ initialData }: SuperadminSystemHealthClientProps) {
  const [data, setData] = useState<SuperadminSystemHealthDataResponse>(initialData);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [lastRefresh, setLastRefresh] = useState('Just now');

  const refreshing = fetchState === 'loading';

  const handleRefresh = async () => {
    setFetchState('loading');
    try {
      const refreshedData = await fetchSuperadminSystemHealthData();
      setData(refreshedData);
      setLastRefresh(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      setFetchState('success');
    } catch (err) {
      logger.error('Failed to refresh system health', err);
      setFetchState('error');
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <SuperadminSystemHealthHeader 
        lastRefresh={lastRefresh} 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
      />

      {refreshing && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-md flex items-center gap-2 text-xs text-primary animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Refreshing system health metrics from infrastructure gateways...
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${refreshing ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <SuperadminSystemHealthMetricCard 
          title="Main Infrastructure" 
          icon={Server} 
          iconColor="text-primary" 
          metrics={data.infrastructure} 
        />
        
        <SuperadminSystemHealthMetricCard 
          title="Databases & Cache" 
          icon={Database} 
          iconColor="text-warning" 
          metrics={data.databases} 
        />

        <SuperadminSystemHealthGatewaysCard gateways={data.gateways} />
      </div>
    </div>
  );
}
