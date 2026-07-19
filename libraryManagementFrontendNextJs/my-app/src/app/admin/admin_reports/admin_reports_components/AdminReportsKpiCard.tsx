'use client';
// RESPONSIBILITY: Renders the individual KPI card for Admin Reports
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Wallet, TrendingUp, Users } from 'lucide-react';
import { KpiCardProps } from './AdminReportsClient_types';

export const ADMIN_REPORTS_KPI_META = [
  { icon: IndianRupee, iconColor: 'var(--primary)', iconBg: 'var(--bg-input)' },
  { icon: Wallet,      iconColor: 'var(--danger)',  iconBg: 'var(--bg-input)' },
  { icon: TrendingUp,  iconColor: 'var(--success)', iconBg: 'var(--bg-input)' },
  { icon: Users,       iconColor: 'var(--warning)', iconBg: 'var(--bg-input)' },
] as const;

export function AdminReportsKpiCard({ label, value, icon: Icon, iconColor, iconBg, trend, sub }: KpiCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-4 shadow-none border-border bg-bg-card hover:shadow-md transition-shadow rounded-[var(--radius-lg)]">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border" style={{ backgroundColor: iconBg }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        {trend && (
          <Badge variant="secondary" className={`${trend.up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'} border-none font-bold text-xs`}>
            {trend.up ? '+' : '-'}{trend.value}
          </Badge>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-secondary">{label}</h3>
        <p className="text-text-primary text-xl font-bold mt-1">{value}</p>
        {sub && <p className="text-xs text-text-secondary mt-1.5">{sub}</p>}
      </div>
    </Card>
  );
}
