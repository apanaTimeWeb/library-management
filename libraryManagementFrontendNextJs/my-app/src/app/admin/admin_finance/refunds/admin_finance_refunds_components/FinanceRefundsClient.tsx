'use client';

import { Undo2, X } from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { useFinanceRefunds } from './admin_finance_refunds_hooks/useFinanceRefunds';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function FinanceRefundsClient() {
  const {
    statusFilter,
    setStatusFilter,
    filteredRefunds,
    kpiData,
    isLoading,
    isSubmitting,
    processDialog,
    setProcessDialog,
    paymentMethod,
    setPaymentMethod,
    deductDialog,
    setDeductDialog,
    deductAmt,
    setDeductAmt,
    deductReason,
    setDeductReason,
    handleProcess,
    handleDeduction
  } = useFinanceRefunds();

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-warning/10 text-warning';
      case 'approved': return 'bg-success/10 text-success';
      case 'processed': return 'bg-info/10 text-info';
      case 'rejected': return 'bg-danger/10 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Refunds</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and process student deposit refund requests.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 shadow-none border-success/30 bg-success/5 flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-wider uppercase text-success mb-1">Total Refunded</p>
          <p className="text-xl font-bold text-success">{isLoading ? '—' : formatCurrency(kpiData.totalRefunded)}</p>
        </Card>
        
        <Card className="p-4 shadow-none border-warning/30 bg-warning/5 flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-wider uppercase text-warning mb-1">Pending</p>
          <p className="text-xl font-bold text-warning">{isLoading ? '—' : kpiData.pendingCount}</p>
        </Card>
        
        <Card className="p-4 shadow-none border-border bg-bg-card flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground mb-1">Approved</p>
          <p className="text-xl font-bold text-text-primary">{isLoading ? '—' : kpiData.approvedCount}</p>
        </Card>
        
        <Card className="p-4 shadow-none border-danger/30 bg-danger/5 flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-wider uppercase text-danger mb-1">Rejected</p>
          <p className="text-xl font-bold text-danger">{isLoading ? '—' : kpiData.rejectedCount}</p>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border border-border">
        <select 
          className="flex h-9 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="processed">Processed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Refunds Table */}
      <Card className="flex-1 shadow-none border-border bg-bg-card overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Exit Date</th>
                <th className="px-5 py-3 text-right">Deposit Held</th>
                <th className="px-5 py-3 text-right">Deduction</th>
                <th className="px-5 py-3 text-right">Net Refund</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading refunds...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">💸</div>
                      <p className="text-lg font-bold">No refunds found.</p>
                      <p className="text-sm text-muted-foreground">Adjust filters if needed.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRefunds.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-[13px] text-text-primary">{r.studentName}</div>
                      <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{r.smartId}</div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted-foreground font-medium">
                      {r.exitDate || '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-[13px] text-text-primary">{formatCurrency(r.depositHeld)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`font-bold text-[13px] ${r.deductionAmount > 0 ? 'text-danger' : 'text-muted-foreground'}`}>
                        {r.deductionAmount > 0 ? `-${formatCurrency(r.deductionAmount)}` : 'None'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-[13px] text-success">{formatCurrency(r.netRefund)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className={`${getStatusBadge(r.status)} border-none uppercase tracking-wider font-bold text-[10px] w-fit`}>
                          {r.status}
                        </Badge>
                        {r.status === 'rejected' && r.rejectionReason && (
                          <span className="text-[10px] text-muted-foreground leading-tight max-w-[120px] truncate" title={r.rejectionReason}>
                            {r.rejectionReason}
                          </span>
                        )}
                        {r.status === 'processed' && r.processedDate && (
                          <span className="text-[10px] text-muted-foreground leading-tight">
                            {r.processedDate} · {r.paymentMethod}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {r.status === 'pending' && (
                          <>
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="bg-warning/10 text-warning hover:bg-warning/20 border-none font-bold text-xs"
                              onClick={() => setDeductDialog({ id: r.id, name: r.studentName })}
                            >
                              ➕ Add Deduction
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="bg-success/10 text-success hover:bg-success/20 border-none font-bold text-xs gap-1"
                              onClick={() => setProcessDialog({ id: r.id, name: r.studentName, amount: r.netRefund })}
                            >
                              <Undo2 size={13} /> Process
                            </Button>
                          </>
                        )}
                        {r.status === 'approved' && (
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="bg-info/10 text-info hover:bg-info/20 border-none font-bold text-xs gap-1"
                            onClick={() => setProcessDialog({ id: r.id, name: r.studentName, amount: r.netRefund })}
                          >
                            <Undo2 size={13} /> Process
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Process Refund Modal */}
      {processDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setProcessDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-success/20 bg-bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-success tracking-tight">
                💸 Process Refund
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setProcessDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-bold text-text-primary mb-1">{processDialog.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Processing refund of <strong className="text-success">{formatCurrency(processDialog.amount)}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setProcessDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleProcess}
                disabled={isSubmitting}
                className="bg-success hover:bg-success/90 text-white"
              >
                {isSubmitting ? 'Processing...' : 'Mark as Processed'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Deduction Modal */}
      {deductDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setDeductDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-warning/20 bg-bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-warning tracking-tight">
                ➕ Add Deduction
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setDeductDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-sm font-bold text-text-primary">{deductDialog.name}</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Deduction Amount <span className="text-danger">*</span></label>
                <Input 
                  type="number"
                  value={deductAmt}
                  onChange={(e) => setDeductAmt(e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason <span className="text-danger">*</span></label>
                <Input 
                  value={deductReason}
                  onChange={(e) => setDeductReason(e.target.value)}
                  placeholder="Reason for deduction"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setDeductDialog(null)}>Cancel</Button>
              <Button 
                variant="default" 
                onClick={handleDeduction}
                disabled={!deductAmt || !deductReason || isSubmitting}
                className="bg-warning hover:bg-warning/90 text-white"
              >
                {isSubmitting ? 'Saving...' : 'Add Deduction'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
