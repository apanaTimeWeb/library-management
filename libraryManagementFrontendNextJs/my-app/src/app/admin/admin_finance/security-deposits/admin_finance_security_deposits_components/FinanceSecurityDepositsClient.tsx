// RESPONSIBILITY: Renders the FinanceSecurityDepositsClient component.
'use client';


import { useState } from 'react';
import { Undo2, Minus, X } from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { useFinanceSecurityDeposits } from '@/app/admin/admin_finance/security-deposits/admin_finance_security_deposits_hooks/useFinanceSecurityDeposits';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';

export function FinanceSecurityDepositsClient() {
  const {
    statusFilter,
    setStatusFilter,
    filtered,
    isLoading,
    refundDialog,
    setRefundDialog,
    refundAmount,
    setRefundAmount,
    deductionAmount,
    setDeductionAmount,
    deductionReason,
    setDeductionReason,
    deductDialog,
    setDeductDialog,
    deductAmt,
    setDeductAmt,
    deductReason,
    setDeductReason,
    handleRefund,
    handleDeduction
  } = useFinanceSecurityDeposits();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'held': return 'bg-info/10 text-info border-none';
      case 'refunded': return 'bg-success/10 text-success border-none';
      case 'forfeited': return 'bg-danger/10 text-danger border-none';
      default: return 'bg-muted text-muted-foreground border-none';
    }
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Security Deposits</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage student security deposit records.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <select 
          className="h-10 px-3 rounded-md border border-border bg-bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="held">Held</option>
          <option value="refunded">Refunded</option>
          <option value="forfeited">Forfeited</option>
        </select>
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-96">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3 text-right">Deposit ₹</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Collected By</th>
                <th className="px-5 py-3">Collected Date</th>
                <th className="px-5 py-3 text-right">Deduction ₹</th>
                <th className="px-5 py-3">Deduction Reason</th>
                <th className="px-5 py-3">Refunded Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading deposits...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">💼</div>
                      <p className="text-lg font-bold">No security deposits recorded.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.slice((page - 1) * limit, page * limit).map((d) => (
                  <tr key={d.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-sm text-primary">{d.studentName}</div>
                      <div className="text-xs font-mono text-muted-foreground">{d.smartId}</div>
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-primary">{formatCurrency(d.depositAmount)}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className={`${getStatusBadge(d.status)} uppercase tracking-wider font-bold text-xs`}>
                        {d.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-primary">{d.collectedBy}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{d.collectedDate}</td>
                    <td className={`px-5 py-4 text-right text-sm font-bold ${d.deductionAmount > 0 ? 'text-danger' : 'text-muted-foreground font-medium'}`}>
                      {d.deductionAmount > 0 ? formatCurrency(d.deductionAmount) : '—'}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{d.deductionReason || '—'}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{d.refundedDate || '—'}</td>
                    <td className="px-5 py-4 text-right">
                      {d.status === 'held' && (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="bg-success/10 text-success hover:bg-success/20 border-none font-bold text-xs h-7 px-2 gap-1"
                            onClick={() => { 
                              setRefundDialog({ id: d.id, name: d.studentName, amount: d.depositAmount }); 
                              setRefundAmount(String(d.depositAmount - d.deductionAmount)); 
                            }}
                          >
                            <Undo2 size={12} /> 💸 Process Refund
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="bg-warning/10 text-warning hover:bg-warning/20 border-none font-bold text-xs h-7 px-2 gap-1"
                            onClick={() => setDeductDialog({ id: d.id, name: d.studentName })}
                          >
                            <Minus size={12} /> ➕ Add Deduction
                          </Button>
                        </div>
                      )}
                      {d.status === 'refunded' && d.refundedDate && (
                        <span className="text-xs font-medium text-muted-foreground">Refunded {d.refundedDate}</span>
                      )}
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
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>

      {/* Process Refund Dialog */}
      {refundDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setRefundDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary tracking-tight">
                💸 Process Refund
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setRefundDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-sm font-medium text-primary bg-muted/50 p-2 rounded text-center">
              Student: <span className="font-bold">{refundDialog.name}</span>
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Refund Amount</label>
                <Input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Deduction Amount</label>
                <Input type="number" value={deductionAmount} onChange={(e) => setDeductionAmount(e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Deduction Reason {parseFloat(deductionAmount) > 0 && <span className="text-danger">*</span>}</label>
                <Input value={deductionReason} onChange={(e) => setDeductionReason(e.target.value)} placeholder="Reason..." />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setRefundDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleRefund}
                className="bg-success hover:bg-success/90 text-white font-bold"
              >
                Process Refund
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Deduction Dialog */}
      {deductDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDeductDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary tracking-tight">
                ➕ Add Deduction
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setDeductDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-sm font-medium text-primary bg-muted/50 p-2 rounded text-center">
              Student: <span className="font-bold">{deductDialog.name}</span>
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Amount <span className="text-danger">*</span></label>
                <Input type="number" value={deductAmt} onChange={(e) => setDeductAmt(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary">Reason <span className="text-danger">*</span></label>
                <Input value={deductReason} onChange={(e) => setDeductReason(e.target.value)} placeholder="Reason for deduction" />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setDeductDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleDeduction}
                disabled={!deductAmt || !deductReason}
                className="bg-warning hover:bg-warning/90 text-white font-bold"
              >
                Add Deduction
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
