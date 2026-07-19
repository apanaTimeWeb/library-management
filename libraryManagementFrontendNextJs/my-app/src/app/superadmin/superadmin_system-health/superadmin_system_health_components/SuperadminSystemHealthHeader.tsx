// RESPONSIBILITY: Renders the SuperadminSystemHealthHeader component.
import React from 'react';
import { RefreshCw } from 'lucide-react';

import { SuperadminSystemHealthHeaderProps } from '@/app/superadmin/superadmin_system-health/superadmin_system_health_types/SuperadminSystemHealthTypes';

export function SuperadminSystemHealthHeader({ lastRefresh, refreshing, onRefresh }: SuperadminSystemHealthHeaderProps) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-xs font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">System Health</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-text-primary text-xl font-extrabold text-text-primary tracking-tight">Component Status Dashboard</h1>
        <button 
          className="flex items-center justify-center gap-2 bg-transparent border border-border hover:bg-input text-text-secondary hover:text-text-primary text-sm font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={onRefresh} 
          disabled={refreshing}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin text-primary' : ''} />
          {refreshing ? 'Refreshing...' : `Refresh Â· ${lastRefresh}`}
        </button>
      </div>
    </div>
  );
}
