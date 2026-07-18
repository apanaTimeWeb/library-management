'use client';
// RESPONSIBILITY: Renders the AdminFinanceDashboardClient component.
import { useState } from 'react';
import {
  PiggyBank, Users, Clock, Ban, UsersRound, ShieldAlert,
  TrendingUp, TrendingDown, IndianRupee, Receipt, AlertTriangle, RefreshCw,
} from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { useAdminFinanceDashboard } from '@/app/admin/admin_finance/finance-dashboard/admin_finance_dashboard_hooks/useAdminFinanceDashboard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminFinanceDashboardClient() {

  const { stats, recentPayments, isLoading } = useAdminFinanceDashboard();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const statCards = stats ? [
    { label: 'Total Collections',   value: formatCurrency(stats.totalCollections), icon: PiggyBank,     sub: <span className="text-success font-medium flex items-center gap-1 text-xs"><TrendingUp size={12} />+{stats.collectionsGrowth}% vs last month</span>, variant: 'default' },
    { label: 'Active Students',      value: stats.activeStudents,                   icon: Users,         sub: null,                                                                                                    variant: 'default' },
    { label: 'Expiring Soon',        value: stats.expiringSoon,                     icon: Clock,         sub: <span className="text-warning text-xs font-medium">within 7 days</span>,                                    variant: 'warning' },
    { label: 'Currently Suspended',  value: stats.suspended,                        icon: Ban,           sub: null,                                                                                                    variant: 'danger'  },
    { label: 'Total Referrals',      value: stats.totalReferrals,                   icon: UsersRound,    sub: null,                                                                                                    variant: 'default' },
    { label: 'Deposits Held',        value: formatCurrency(stats.depositsHeld),     icon: ShieldAlert,   sub: null,                                                                                                    variant: 'default' },
    { label: 'Pending Promises',     value: stats.pendingPromises,                  icon: Receipt,       sub: <span className="text-muted-foreground text-xs">payment promises pending</span>,                           variant: 'default' },
    { label: 'Overdue Students',     value: stats.overdueStudents,                  icon: AlertTriangle, sub: <span className="text-warning text-xs font-medium">late fee accruing</span>,                                variant: 'warning' },
    { label: 'Renewals Due',         value: stats.renewalsDue,                      icon: RefreshCw,     sub: <span className="text-muted-foreground text-xs">need renewal</span>,                                       variant: 'default' },
    { label: 'Pending Refunds',      value: stats.pendingRefunds,                   icon: IndianRupee,   sub: <span className="text-muted-foreground text-xs">deposit refund requests</span>,                            variant: 'default' },
    { label: 'Late Fee Accrued',     value: formatCurrency(stats.lateFeeAccrued),   icon: TrendingDown,  sub: <span className="text-danger text-xs font-medium">this month</span>,                                        variant: 'danger'  },
  ] : [];
    const table = useClientTable(statCards, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-text-primaryxl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of financial intelligence.</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-5 shadow-none border-border bg-card space-y-3">
                <div className="animate-pulse bg-muted h-4 w-28 rounded" />
                <div className="animate-pulse bg-muted h-8 w-20 rounded" />
                <div className="animate-pulse bg-muted h-3 w-24 rounded" />
              </Card>
            ))
          : table.paginatedData.map(({ label, value, icon: Icon, sub, variant }) => (
              <Card
                key={label}
                className={`p-5 shadow-none border-border bg-card flex flex-col gap-3 hover:shadow-md transition-shadow ${
                  variant === 'warning' ? 'border-warning/30 bg-warning/5' : 
                  variant === 'danger' ? 'border-danger/30 bg-danger/5' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold tracking-wider uppercase ${
                    variant === 'warning' ? 'text-warning' : 
                    variant === 'danger' ? 'text-danger' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    variant === 'warning' ? 'bg-warning/20 text-warning' : 
                    variant === 'danger' ? 'bg-danger/20 text-danger' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon size={16} />
                  </div>
                </div>
                <p className={`text-text-primaryxl font-bold leading-none tracking-tight ${
                  variant === 'warning' ? 'text-warning' : 
                  variant === 'danger' ? 'text-danger' : 'text-primary'
                }`}>
                  {value}
                </p>
                {sub && <div className="mt-1 h-4 flex items-center">{sub}</div>}
              </Card>
            ))}
      </div>

      {/* Recent Payments */}
      <Card className="shadow-none border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Receipt size={18} className="text-muted-foreground" />
          <h3 className="font-bold text-base text-primary">Recent Payments</h3>
        </div>
        <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-5 py-4">
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-32" />
                          <div className="h-3 bg-muted rounded w-20" />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-6 bg-muted rounded-full w-16" />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="h-4 bg-muted rounded w-16 ml-auto" />
                      </td>
                    </tr>
                  ))
                : recentPayments.slice((page - 1) * limit, page * limit).map((p) => (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-sm text-primary">{p.studentName}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-0.5">{p.studentSmartId} · {p.date}</div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant="secondary" className={`border-none uppercase tracking-wide font-bold ${
                          p.mode.toLowerCase() === 'upi' ? 'bg-primary/10 text-primary' :
                          p.mode.toLowerCase() === 'cash' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {p.mode}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-sm text-primary">{formatCurrency(p.amount)}</span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={recentPayments.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
