'use client';
import React, { useState } from 'react';
import { Server, Database } from 'lucide-react';
import type { SuperadminSystemHealthDataResponse } from './superadmin_system_health_types/SuperadminSystemHealthTypes';
import { SuperadminSystemHealthHeader } from './superadmin_system_health_components/SuperadminSystemHealthHeader';
import { SuperadminSystemHealthMetricCard } from './superadmin_system_health_components/SuperadminSystemHealthMetricCard';
import { SuperadminSystemHealthGatewaysCard } from './superadmin_system_health_components/SuperadminSystemHealthGatewaysCard';
import { fetchSuperadminSystemHealthData } from './superadmin_system_health_api/SuperadminSystemHealthApi';

interface Props {
  initialData: SuperadminSystemHealthDataResponse;
}

export function SuperadminSystemHealthClient({ initialData }: Props) {
  const [data, setData] = useState<SuperadminSystemHealthDataResponse>(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState('Just now');

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const refreshedData = await fetchSuperadminSystemHealthData();
      setData(refreshedData);
      setLastRefresh(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <SuperadminSystemHealthHeader 
        lastRefresh={lastRefresh} 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
      />

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${refreshing ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <SuperadminSystemHealthMetricCard 
          title="Main Infrastructure" 
          icon={Server} 
          iconColor="text-[var(--primary)]" 
          metrics={data.infrastructure} 
        />
        
        <SuperadminSystemHealthMetricCard 
          title="Databases & Cache" 
          icon={Database} 
          iconColor="text-[var(--warning)]" 
          metrics={data.databases} 
        />

        <SuperadminSystemHealthGatewaysCard gateways={data.gateways} />
      </div>
    </div>
  );
}
