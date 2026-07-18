// RESPONSIBILITY: Renders the FinanceRenewalsClient component.
'use client';


import { useState } from 'react';
import { RefreshCw, Send, X } from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { useFinanceRenewals } from '@/app/admin/admin_finance/renewals/admin_finance_renewals_hooks/useFinanceRenewals';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';

export function FinanceRenewalsClient() {
  const {
    filter,
    setFilter,
    visible,
    handleRemindAll,
    handleRemind,
    openRenew,
    handleRenew,
    renewDialog,
    setRenewDialog,
    renewPlanId,
    setRenewPlanId,
    renewAmount,
    setRenewAmount,
    renewMode,
    setRenewMode,
    renewTxnId,
    setRenewTxnId,
    isRenewing,
    ADMIN_FINANCE_MOCK_PLANS,
    ADMIN_FINANCE_FILTERS
  } = useFinanceRenewals();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getDaysLeftStyle = (days: number) => {
    if (days < 0) return 'text-danger font-bold';
    if (days <= 7) return 'text-warning font-bold';
    return 'text-primary font-bold';
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Renewals</h1>
          <p className="text-sm text-muted-foreground mt-1">Subscriptions needing renewal attention.</p>
        </div>
        <Button onClick={handleRemindAll} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold gap-2">
          <Send size={16} /> 📱 Remind All
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {ADMIN_FINANCE_FILTERS.slice((page - 1) * limit, page * limit).map((f) => (
          <Badge
            key={f.value}
            variant="secondary"
            onClick={() => setFilter(f.value as string)}
            className={`cursor-pointer px-4 py-2 border-none font-bold text-sm uppercase tracking-wider transition-colors ${filter === f.value ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            {f.emoji} {f.label}
          </Badge>
        ))}
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-96">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Smart ID</th>
                <th className="px-5 py-3">Shift</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Expiry Date</th>
                <th className="px-5 py-3">Days Left</th>
                <th className="px-5 py-3">Last Payment</th>
                <th className="px-5 py-3 text-right">Due ₹</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">✨</div>
                      <p className="text-lg font-bold">No renewals needed.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                visible.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 font-bold text-sm text-primary">{r.studentName}</td>
                    <td className="px-5 py-4 text-xs font-mono text-muted-foreground">{r.smartId}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-bold text-xs">
                        {r.shift}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-primary">{r.plan}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.expiryDate}</td>
                    <td className="px-5 py-4">
                      <span className={getDaysLeftStyle(r.daysLeft)}>
                        {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)} days ago` : `${r.daysLeft} days`}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.lastPaymentDate}</td>
                    <td className={`px-5 py-4 text-right text-sm font-bold ${r.due > 0 ? 'text-danger' : 'text-primary'}`}>
                      {formatCurrency(r.due)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold text-xs h-7 px-2 gap-1"
                          onClick={() => openRenew(r)}
                        >
                          <RefreshCw size={12} /> Renew
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="bg-muted text-primary hover:bg-muted/80 border-none font-bold text-xs h-7 px-2 gap-1"
                          onClick={() => handleRemind(r.studentName)}
                        >
                          <Send size={12} /> Remind
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
            page={page}
            limit={limit}
            totalItems={ADMIN_FINANCE_FILTERS.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>

      {/* Renew Dialog */}
      {renewDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setRenewDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary tracking-tight">
                Renew Subscription
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setRenewDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-sm font-medium text-primary bg-muted/50 p-2 rounded text-center">
              Student: <span className="font-bold">{renewDialog.name}</span>
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Plan</label>
                <select
                  className="w-full h-10 px-3 rounded-md border border-border bg-bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={renewPlanId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setRenewPlanId(id);
                    const selectedPlan = ADMIN_FINANCE_MOCK_PLANS.find((p) => String(p.id) === id);
                    if (selectedPlan) {
                      setRenewAmount(String(selectedPlan.price));
                    }
                  }}
                >
                  {ADMIN_FINANCE_MOCK_PLANS.map((p) => (
                    <option key={p.id} value={String(p.id)}>{p.name} — {formatCurrency(p.price)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Amount</label>
                <Input type="number" value={renewAmount} onChange={(e) => setRenewAmount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Payment Mode</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-border bg-bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={renewMode} 
                  onChange={(e) => setRenewMode(e.target.value)}
                >
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              {renewMode !== 'cash' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                  <label className="text-sm font-medium text-primary">Transaction ID</label>
                  <Input value={renewTxnId} onChange={(e) => setRenewTxnId(e.target.value)} placeholder="Enter transaction reference" />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setRenewDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleRenew}
                disabled={isRenewing || !renewAmount}
                className="bg-success hover:bg-success/90 text-white font-bold"
              >
                {isRenewing ? 'Renewing...' : '✅ Confirm Renewal'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
