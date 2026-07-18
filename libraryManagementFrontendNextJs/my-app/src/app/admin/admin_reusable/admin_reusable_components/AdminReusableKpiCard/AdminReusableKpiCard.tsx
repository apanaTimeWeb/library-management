// RESPONSIBILITY: Renders a KPI metrics summary card with icon, value, and trend indicators.
// DATA FLOW: AdminDashboardPage / Reports -> AdminReusableKpiCard

import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AdminReusableKpiCardProps } from "./AdminReusableKpiCard_types";

export default function AdminReusableKpiCard({ label, value, icon: Icon, iconColor, iconBg, trend, sub }: AdminReusableKpiCardProps) {
  return (
    <Card className="border-border bg-card shadow-none flex flex-col justify-between p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--bg)]" style={{ '--bg': iconBg } as React.CSSProperties}>
          <Icon size={18} className="text-[color:var(--c)]" style={{ '--c': iconColor } as React.CSSProperties} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${trend.up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {trend.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary mt-1">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </Card>
  );
}

