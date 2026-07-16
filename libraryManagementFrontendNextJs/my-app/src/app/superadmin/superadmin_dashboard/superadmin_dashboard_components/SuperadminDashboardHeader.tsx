import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

export function SuperadminDashboardHeader() {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">Dashboard</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Platform Overview</h1>
        <Link href="/superadmin/superadmin_audit-logs" className="inline-flex items-center gap-2 bg-bg-card border border-border hover:bg-bg-input hover:border-primary text-text-primary text-sm font-semibold px-4 py-2.5 rounded-[var(--radius-md)] transition-all duration-200">
          <Activity size={16} className="text-primary" /> View Audit Logs
        </Link>
      </div>
    </div>
  );
}
