import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { SUPERADMIN_DASHBOARD_RECENT_ACTIVITY } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';

export function SuperadminDashboardRecentActivity() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm mt-8">
      <div className="p-6 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-page)]/30">
        <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Clock size={16} className="text-[var(--primary)]" /> Recent Platform Activity
        </h2>
        <Link href="/superadmin/superadmin_audit-logs" className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 hover:text-[var(--primary-hover)] transition-colors">
          View All Logs
        </Link>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {SUPERADMIN_DASHBOARD_RECENT_ACTIVITY.map((item, i) => (
          <Link key={i} href={item.href} className="block p-4 hover:bg-[var(--bg-input)] transition-colors duration-200">
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                item.type === 'success' ? 'bg-[var(--success)] shadow-[0_0_8px_var(--success)]' :
                item.type === 'danger' ? 'bg-[var(--danger)] shadow-[0_0_8px_var(--danger)]' :
                item.type === 'warning' ? 'bg-[var(--warning)] shadow-[0_0_8px_var(--warning)]' :
                'bg-[var(--info,#3B82F6)] shadow-[0_0_8px_var(--info)]'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.title}</p>
                <p className="text-xs text-[var(--text-secondary)] truncate">{item.desc}</p>
              </div>
              <span className="text-[11px] font-medium text-[var(--text-disabled)] shrink-0">{item.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
