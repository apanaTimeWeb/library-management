// RESPONSIBILITY: Renders the SuperadminDashboardRecentActivity component.
import React from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { Clock } from 'lucide-react';
import { SUPERADMIN_DASHBOARD_RECENT_ACTIVITY } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';

export function SuperadminDashboardRecentActivity() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm mt-8">
      <div className="p-6 flex items-center justify-between border-b border-border bg-page/30">
        <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
          <Clock size={16} className="text-primary" /> Recent Platform Activity
        </h2>
        <Link href={SUPERADMIN_ROUTES.AUDIT_LOGS} className="text-primary text-xs font-bold flex items-center gap-1 hover:text-primary-hover transition-colors">
          View All Logs
        </Link>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {SUPERADMIN_DASHBOARD_RECENT_ACTIVITY.map((item, i) => (
          <Link key={i} href={item.href} className="block p-4 hover:bg-input transition-colors duration-200">
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                item.type === 'success' ? 'bg-success shadow-[0_0_8px_var(--success)]' :
                item.type === 'danger' ? 'bg-danger shadow-[0_0_8px_var(--danger)]' :
                item.type === 'warning' ? 'bg-warning shadow-[0_0_8px_var(--warning)]' :
                'bg-info shadow-[0_0_8px_var(--info)]'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{item.title}</p>
                <p className="text-xs text-text-secondary truncate">{item.desc}</p>
              </div>
              <span className="text-xs font-medium text-text-disabled shrink-0">{item.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
