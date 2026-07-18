// RESPONSIBILITY: Renders the AdminDashboardKpiCard component.
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { AdminDashboardKpiCardProps } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';

export function AdminDashboardKpiCard({ label, value, icon: Icon, iconColor, iconBg, trend, sub }: AdminDashboardKpiCardProps) {
  return (
    <Card className="border-border bg-bg-pageg-card shadow-none flex flex-col justify-between p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--bg)]" style={{ '--bg': iconBg } as React.CSSProperties}>
          <Icon size={18} className="text-[color:var(--c)]" style={{ '--c': iconColor } as React.CSSProperties} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trend.up ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
            {trend.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-text-primaryxl font-bold text-primary mt-1">{value}</p>
        {sub && <p className="text-xs text-text-secondary mt-1">{sub}</p>}
      </div>
    </Card>
  );
}
