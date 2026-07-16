import React from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
  lastRefresh: string;
  refreshing: boolean;
  onRefresh: () => void;
}

export function SuperadminSystemHealthHeader({ lastRefresh, refreshing, onRefresh }: Props) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-[var(--primary)]">System Health</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Component Status Dashboard</h1>
        <button 
          className="flex items-center justify-center gap-2 bg-transparent border border-[var(--border)] hover:bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[13px] font-bold py-2 px-4 rounded-[var(--radius-md)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={onRefresh} 
          disabled={refreshing}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin text-[var(--primary)]' : ''} />
          {refreshing ? 'Refreshing...' : `Refresh · ${lastRefresh}`}
        </button>
      </div>
    </div>
  );
}
