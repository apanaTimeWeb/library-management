'use client';
// RESPONSIBILITY: Renders the SuperadminFinanceDashboardClient component.
import React from 'react';
import {
  PiggyBank, Users, Clock, Ban, UsersRound, ShieldAlert,
  TrendingUp, TrendingDown, IndianRupee, Receipt, AlertTriangle, RefreshCw,
} from 'lucide-react';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import { useSuperadminFinanceDashboardClient } from '@/app/superadmin/superadmin_finance/finance-dashboard/_components/useSuperadminFinanceDashboardClient';

const MODE_BADGE: Record<string, string> = {
  cash: 'bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/20',
  upi:  'bg-primary/10 text-primary border border-primary/20',
  card: 'bg-warning/10 text-warning border border-warning/20',
  bank: 'bg-info/10 text-info border border-info/20',
};

export function SuperadminFinanceDashboardClient() {
  const { stats, recentPayments, isLoading } = useSuperadminFinanceDashboardClient();

  const statCards = stats ? [
    { label: 'Total Collections',   value: formatCurrency(stats.totalCollections), icon: PiggyBank,     sub: <span className="text-success font-semibold flex items-center gap-1 text-xs"><TrendingUp size={12} />+{stats.collectionsGrowth}% vs last month</span>, variant: 'default' as const },
    { label: 'Active Students',      value: stats.activeStudents,                   icon: Users,         sub: null,                                                                                                    variant: 'default' as const },
    { label: 'Expiring Soon',        value: stats.expiringSoon,                     icon: Clock,         sub: <span className="text-warning font-semibold text-xs">within 7 days</span>,                                    variant: 'warning' as const },
    { label: 'Currently Suspended',  value: stats.suspended,                        icon: Ban,           sub: null,                                                                                                    variant: 'danger'  as const },
    { label: 'Total Referrals',      value: stats.totalReferrals,                   icon: UsersRound,    sub: null,                                                                                                    variant: 'default' as const },
    { label: 'Deposits Held',        value: formatCurrency(stats.depositsHeld),     icon: ShieldAlert,   sub: null,                                                                                                    variant: 'default' as const },
    { label: 'Pending Promises',     value: stats.pendingPromises,                  icon: Receipt,       sub: <span className="text-text-secondary text-xs">payment promises pending</span>,                           variant: 'default' as const },
    { label: 'Overdue Students',     value: stats.overdueStudents,                  icon: AlertTriangle, sub: <span className="text-warning font-semibold text-xs">late fee accruing</span>,                                variant: 'warning' as const },
    { label: 'Renewals Due',         value: stats.renewalsDue,                      icon: RefreshCw,     sub: <span className="text-text-secondary text-xs">need renewal</span>,                                       variant: 'default' as const },
    { label: 'Pending Refunds',      value: stats.pendingRefunds,                   icon: IndianRupee,   sub: <span className="text-text-secondary text-xs">deposit refund requests</span>,                            variant: 'default' as const },
    { label: 'Late Fee Accrued',     value: formatCurrency(stats.lateFeeAccrued),   icon: TrendingDown,  sub: <span className="text-danger font-semibold text-xs">this month</span>,                                        variant: 'danger'  as const },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-xs text-text-secondary">Overview of financial intelligence.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card p-5 rounded-lg border border-border flex flex-col justify-between space-y-3">
                <div className="h-4 w-28 bg-muted/20 animate-pulse rounded" />
                <div className="h-8 w-20 bg-muted/20 animate-pulse rounded" />
                <div className="h-3 w-24 bg-muted/20 animate-pulse rounded" />
              </div>
            ))
          : statCards.map(({ label, value, icon: Icon, sub, variant }) => (
              <div
                key={label}
                className={`bg-card p-5 rounded-lg border ${variant === 'warning' ? 'border-warning/30 bg-warning/5' : variant === 'danger' ? 'border-danger/30 bg-danger/5' : 'border-border'} flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${variant === 'warning' ? 'text-warning' : variant === 'danger' ? 'text-danger' : 'text-text-secondary'}`}>
                    {label}
                  </span>
                  <Icon size={16} className={variant === 'warning' ? 'text-warning' : variant === 'danger' ? 'text-danger' : 'text-text-secondary'} />
                </div>
                <p className={`text-text-primaryxl font-black tracking-tight ${variant === 'warning' ? 'text-warning' : variant === 'danger' ? 'text-danger' : 'text-text-primary'}`}>
                  {value}
                </p>
                {sub && <div className="mt-1">{sub}</div>}
              </div>
            ))}
      </div>

      {/* Recent Payments */}
      <div className="bg-card rounded-lg border border-border">
        <div className="flex items-center gap-2 p-6 border-b border-border bg-primary/5">
          <Receipt size={20} className="text-text-secondary" />
          <span className="text-base text-text-primary font-bold">Recent Payments</span>
        </div>
        <div>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-b border-border last:border-0">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted/20 animate-pulse rounded" />
                    <div className="h-3 w-20 bg-muted/20 animate-pulse rounded" />
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-4 w-16 bg-muted/20 animate-pulse rounded ml-auto" />
                    <div className="h-3 w-12 bg-muted/20 animate-pulse rounded ml-auto" />
                  </div>
                </div>
              ))
            : recentPayments.map(( p ) => (
                <div key={p.id} className="flex justify-between items-center p-4 border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <div>
                    <div className="font-medium text-sm text-text-primary">{p.studentName}</div>
                    <div className="text-xs text-text-secondary">{p.studentSmartId} · {p.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${MODE_BADGE[p.mode] || 'bg-input text-text-primary border border-border'} px-2 py-0.5 rounded-full text-xs font-bold capitalize`}>{p.mode}</span>
                    <span className="font-semibold text-sm text-text-primary">{formatCurrency(p.amount)}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
