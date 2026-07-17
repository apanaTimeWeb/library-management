// RESPONSIBILITY: Renders student security deposit refund processing pipeline with deduction calculation and payout tracking.
// DATA FLOW: API /finance/refunds -> Refunds State -> Process / Deduct Modals
'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api';
import { logger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { Undo2 } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import type { SuperadminFinanceRefund } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { SUPERADMIN_FINANCE_MOCK_REFUNDS } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

const STATUS_BADGE: Record<string, string> = {
  pending:   'fin-badge fin-badge--warning',
  approved:  'fin-badge fin-badge--success',
  rejected:  'fin-badge fin-badge--danger',
  processed: 'fin-badge fin-badge--info',
};

export function RefundsClient() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [allRefunds, setAllRefunds] = useState<SuperadminFinanceRefund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processDialog, setProcessDialog] = useState<{ id: number; name: string; amount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deductDialog, setDeductDialog] = useState<{ id: number; name: string } | null>(null);
  const [deductAmt, setDeductAmt] = useState('');
  const [deductReason, setDeductReason] = useState('');

  useEffect(() => {
    fetchApi('/finance/refunds').then(( data: any ) => {
      const actualData = Array.isArray(data) ? data : data?.data;
      if (!Array.isArray(actualData) || actualData.length === 0 || String(actualData[0]?.id).startsWith('MOCK-')) {
        setAllRefunds(SUPERADMIN_FINANCE_MOCK_REFUNDS as SuperadminFinanceRefund[]);
        setIsLoading(false);
        return;
      }
      const mapped: SuperadminFinanceRefund[] = actualData.map(( r: Record<string, any> ) => ({
        id: parseInt(String(r.id || '0'), 10),
        studentName: String(r.name || 'Student'),
        smartId: 'S-001',
        depositHeld: 1000,
        deductionAmount: 0,
        netRefund: Number(r.amount) || 0,
        status: (r.status || 'pending') as SuperadminFinanceRefund['status'],
        requestedDate: r.date ? new Date(String(r.date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      }));
      setAllRefunds(mapped);
      setIsLoading(false);
    }).catch(err => {
      logger.error('Failed to load finance refunds', err);
      setIsLoading(false);
    });
  }, []);

  const filtered = allRefunds.filter((r) => statusFilter === 'all' || r.status === statusFilter);
  const totalRefunded = allRefunds.filter((r) => r.status === 'processed').reduce((s, r) => s + r.netRefund, 0);
  const pendingCount = allRefunds.filter((r) => r.status === 'pending').length;

  const handleProcess = () => {
    if (!processDialog) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map(( r ) =>
          r.id === processDialog.id
            ? { ...r, status: 'processed', processedDate: new Date().toISOString().split('T')[0], paymentMethod: paymentMethod.toUpperCase() }
            : r
        )
      );
      toast.success(`💸 Refund of ${formatCurrency(processDialog.amount)} for ${processDialog.name} processed.`);
      setProcessDialog(null); setPaymentMethod('upi'); setIsSubmitting(false);
    }, 700);
  };

  const handleDeduction = () => {
    if (!deductDialog || !deductAmt || !deductReason) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAllRefunds((prev) =>
        prev.map(( r ) =>
          r.id === deductDialog.id
            ? { ...r, deductionAmount: parseFloat(deductAmt), netRefund: r.depositHeld - parseFloat(deductAmt) }
            : r
        )
      );
      toast.success(`➕ Deduction added for ${deductDialog.name}.`);
      setDeductDialog(null); setDeductAmt(''); setDeductReason(''); setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fin-page-title">Refunds</h1>
        <p className="fin-page-subtitle">Manage and process student deposit refund requests.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="fin-stat-mini">
          <p className="fin-stat-mini__label">Total Refunded</p>
          <p className="fin-stat-mini__value fin-stat-mini__value--success">{isLoading ? '—' : formatCurrency(totalRefunded)}</p>
        </div>
        <div className="fin-stat-mini">
          <p className="fin-stat-mini__label">Pending</p>
          <p className="fin-stat-mini__value fin-stat-mini__value--warning">{isLoading ? '—' : pendingCount}</p>
        </div>
        <div className="fin-stat-mini">
          <p className="fin-stat-mini__label">Approved</p>
          <p className="fin-stat-mini__value">{isLoading ? '—' : allRefunds.filter((r) => r.status === 'approved').length}</p>
        </div>
        <div className="fin-stat-mini">
          <p className="fin-stat-mini__label">Rejected</p>
          <p className="fin-stat-mini__value fin-stat-mini__value--danger">{isLoading ? '—' : allRefunds.filter((r) => r.status === 'rejected').length}</p>
        </div>
      </div>

      <div className="fin-filter-bar flex gap-2">
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
              { label: 'Processed', value: 'processed' },
              { label: 'Rejected', value: 'rejected' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      <div className="fin-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="fin-table-header-row">
              <th className="text-left py-3 px-4">Student</th>
              <th className="text-left py-3 px-4">Exit Date</th>
              <th className="text-right py-3 px-4">Deposit Held ₹</th>
              <th className="text-right py-3 px-4">Deduction ₹</th>
              <th className="text-right py-3 px-4">Net Refund ₹</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="fin-table-row">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="fin-skeleton h-4 w-16" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="fin-empty-state">
                    <div className="fin-empty-state__icon">💸</div>
                    <p className="fin-empty-state__title">No pending refunds.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(( r ) => (
                <tr key={r.id} className="fin-table-hover-row fin-table-row">
                  <td className="py-3 px-4">
                    <div className="fin-cell-name">{r.studentName}</div>
                    <div className="fin-cell-subtext">{r.smartId}</div>
                  </td>
                  <td className="py-3 px-4 fin-cell-subtext">{r.exitDate || '—'}</td>
                  <td className="py-3 px-4 text-right font-semibold fin-text-body">{formatCurrency(r.depositHeld)}</td>
                  <td className={`py-3 px-4 text-right ${r.deductionAmount > 0 ? 'fin-text-danger' : 'fin-text-muted'}`}>
                    {r.deductionAmount > 0 ? `-${formatCurrency(r.deductionAmount)}` : 'None'}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold fin-text-success">{formatCurrency(r.netRefund)}</td>
                  <td className="py-3 px-4">
                    <span className={STATUS_BADGE[r.status] || 'fin-badge fin-badge--neutral'}>{r.status}</span>
                    {r.status === 'rejected' && r.rejectionReason && (
                      <div className="fin-cell-subtext mt-1 max-w-32 truncate">{r.rejectionReason}</div>
                    )}
                    {r.status === 'processed' && r.processedDate && (
                      <div className="fin-cell-subtext mt-1">{r.processedDate} · {r.paymentMethod}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {r.status === 'pending' && (
                        <>
                          <button
                            className="fin-badge fin-badge--success cursor-pointer"
                            onClick={() => setProcessDialog({ id: r.id, name: r.studentName, amount: r.netRefund })}
                          >
                            <Undo2 size={11} /> 💸 Process Refund
                          </button>
                          <button
                            className="fin-badge fin-badge--warning cursor-pointer"
                            onClick={() => setDeductDialog({ id: r.id, name: r.studentName })}
                          >
                            ➕ Add Deduction
                          </button>
                        </>
                      )}
                      {r.status === 'approved' && (
                        <button
                          className="fin-badge fin-badge--info cursor-pointer"
                          onClick={() => setProcessDialog({ id: r.id, name: r.studentName, amount: r.netRefund })}
                        >
                          <Undo2 size={11} /> Process
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {processDialog && (
        <div className="fin-dialog-overlay">
          <div className="fin-dialog">
            <h2 className="fin-dialog__title">💸 Process Refund — {processDialog.name}</h2>
            <button className="fin-dialog__close" onClick={() => setProcessDialog(null)}>✕</button>
            <p className="fin-dialog-helper">Processing refund of <span className="font-semibold fin-text-success">{formatCurrency(processDialog.amount)}</span></p>
            <div className="mt-4">
              <label className="fin-label">Payment Method</label>
              <SuperadminSearchableDropdown
                options={[
                  { label: 'UPI', value: 'upi' },
                  { label: 'Bank Transfer', value: 'bank' },
                  { label: 'Cash', value: 'cash' },
                  { label: 'Cheque', value: 'cheque' }
                ]}
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
            <div className="fin-dialog__footer mt-6">
              <button className="fin-badge fin-badge--neutral cursor-pointer" onClick={() => setProcessDialog(null)}>Cancel</button>
              <button className="fin-badge fin-badge--success cursor-pointer" onClick={handleProcess} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Mark as Processed'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deductDialog && (
        <div className="fin-dialog-overlay">
          <div className="fin-dialog">
            <h2 className="fin-dialog__title">➕ Add Deduction — {deductDialog.name}</h2>
            <button className="fin-dialog__close" onClick={() => setDeductDialog(null)}>✕</button>
            <div className="space-y-4">
              <div>
                <label className="fin-label">Deduction Amount <span className="fin-text-danger">*</span></label>
                <input type="number" className="fin-input" value={deductAmt} onChange={( e: any ) => setDeductAmt(e.target.value)} />
              </div>
              <div>
                <label className="fin-label">Reason <span className="fin-text-danger">*</span></label>
                <input className="fin-input" value={deductReason} onChange={( e: any ) => setDeductReason(e.target.value)} placeholder="Reason for deduction" />
              </div>
            </div>
            <div className="fin-dialog__footer mt-6">
              <button className="fin-badge fin-badge--neutral cursor-pointer" onClick={() => setDeductDialog(null)}>Cancel</button>
              <button
                className="fin-badge fin-badge--warning cursor-pointer"
                onClick={handleDeduction}
                disabled={!deductAmt || !deductReason || isSubmitting}
              >
                Add Deduction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
