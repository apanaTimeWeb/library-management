'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminFinanceSubscriptionsClient component.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { RefreshCw, Eye , Search} from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { useAdminFinanceSubscriptions } from '@/app/admin/admin_finance/subscriptions/admin_finance_subscriptions_hooks/useAdminFinanceSubscriptions';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminFinanceSubscriptionsClient() {

  const {
    statusFilter,
    setStatusFilter,
    planFilter,
    setPlanFilter,
    shiftFilter,
    setShiftFilter,
    rows,
    isLoading,
    handleRenew,
    handleView
  } = useAdminFinanceSubscriptions();

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-none';
      case 'expired': return 'bg-danger/10 text-danger border-none';
      case 'suspended': return 'bg-warning/10 text-warning border-none';
      case 'cancelled': return 'bg-muted text-muted-foreground border-none';
      default: return 'bg-muted text-muted-foreground border-none';
    }
  };

  const getDaysLeftStyle = (days: number) => {
    if (days < 0) return 'text-danger font-bold';
    if (days <= 7) return 'text-danger font-bold';
    if (days <= 15) return 'text-warning font-bold';
    return 'text-success font-bold';
  };
    const table = useClientTable(rows, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all student subscriptions.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <AdminSearchableDropdown 
          className="h-10 px-3 rounded-md border border-border bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="suspended">Suspended</option>
          <option value="cancelled">Cancelled</option>
        </AdminSearchableDropdown>
        <AdminSearchableDropdown 
          className="h-10 px-3 rounded-md border border-border bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={planFilter} 
          onChange={(e) => setPlanFilter(e.target.value)}
        >
          <option value="all">All Plans</option>
          <option value="Basic Plan">Basic Plan</option>
          <option value="Premium Plan">Premium Plan</option>
        </AdminSearchableDropdown>
        <AdminSearchableDropdown 
          className="h-10 px-3 rounded-md border border-border bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={shiftFilter} 
          onChange={(e) => setShiftFilter(e.target.value)}
        >
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Full Day">Full Day</option>
        </AdminSearchableDropdown>
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto flex-1">
          
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

<div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Smart ID</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Start Date</th>
                <th className="px-5 py-3">End Date</th>
                <th className="px-5 py-3">Days Left</th>
                <th className="px-5 py-3 text-right">Base ₹</th>
                <th className="px-5 py-3 text-right">Discount ₹</th>
                <th className="px-5 py-3 text-right">Total ₹</th>
                <th className="px-5 py-3 text-right">Paid ₹</th>
                <th className="px-5 py-3 text-right">Due ₹</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={13} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading subscriptions...</p>
                    </div>
                  </td>
                </tr>
              ) : table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={13} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">ðŸ“‹</div>
                      <p className="text-lg font-bold">No subscriptions found.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-3 font-bold text-sm text-primary">{s.studentName}</td>
                    <td className="px-5 py-3 text-xs font-mono text-muted-foreground">{s.smartId}</td>
                    <td className="px-5 py-3 text-sm font-medium text-primary">{s.plan}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{s.startDate}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{s.endDate}</td>
                    <td className="px-5 py-3">
                      <span className={getDaysLeftStyle(s.daysLeft)}>
                        {s.daysLeft < 0 ? `${Math.abs(s.daysLeft)}d ago` : `${s.daysLeft}d`}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-sm font-medium text-primary">{formatCurrency(s.base)}</td>
                    <td className="px-5 py-3 text-right text-sm font-bold text-success">{formatCurrency(s.discount)}</td>
                    <td className="px-5 py-3 text-right text-sm font-bold text-primary">{formatCurrency(s.total)}</td>
                    <td className="px-5 py-3 text-right text-sm font-bold text-success">{formatCurrency(s.paid)}</td>
                    <td className={`px-5 py-3 text-right text-sm font-bold ${s.due > 0 ? 'text-danger' : 'text-primary'}`}>
                      {formatCurrency(s.due)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary" className={`${getStatusBadge(s.status)} uppercase tracking-wider font-bold text-xs`}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold text-xs h-7 px-2 gap-1"
                          onClick={() => handleRenew(s.id)}
                        >
                          <RefreshCw size={12} /> Renew
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-muted text-primary hover:bg-muted/80 border-none font-bold text-xs h-7 px-2 gap-1"
                          onClick={() => handleView(s.studentName)}
                        >
                          <Eye size={12} /> View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
            totalItems={rows.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
