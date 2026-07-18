'use client';
// RESPONSIBILITY: Renders the SuperadminSecurityDepositsClient component.
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import { Undo2, Minus, Briefcase } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { Toaster } from 'react-hot-toast';
import { useSuperadminSecurityDepositsClient } from '@/app/superadmin/superadmin_finance/security-deposits/_components/useSuperadminSecurityDepositsClient';
import { SuperadminSecurityDepositRefundModal } from '@/app/superadmin/superadmin_finance/security-deposits/_components/SuperadminSecurityDepositRefundModal';
import { SuperadminSecurityDepositDeductModal } from '@/app/superadmin/superadmin_finance/security-deposits/_components/SuperadminSecurityDepositDeductModal';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const STATUS_BADGE: Record<string, string> = {
  held:      'bg-info/10 text-info border-info/20',
  refunded:  'bg-success/10 text-success border-success/20',
  forfeited: 'bg-danger/10 text-danger border-danger/20',
};

export function SuperadminSecurityDepositsClient() {
    const table = useClientTable(Array.from({ length: 5 }));
  const {
    statusFilter, setStatusFilter,
    filtered, isLoading,
    refundTarget, setRefundTarget, openRefund, handleRefundSubmit,
    deductTarget, setDeductTarget, openDeduct, handleDeductSubmit,
    isProcessing,
  } = useSuperadminSecurityDepositsClient();

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" toastOptions={{
        className: 'bg-card text-text-primary border border-border text-sm'
      }} />

      <div>
        <h1 className="text-xl font-bold text-text-primary">Security Deposits</h1>
        <p className="text-xs text-text-secondary">Manage student security deposit records.</p>
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border w-fit">
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Held', value: 'held' },
              { label: 'Refunded', value: 'refunded' },
              { label: 'Forfeited', value: 'forfeited' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-xs font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Student</th>
              <th className="text-right py-3 px-4">Deposit ₹</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Collected By</th>
              <th className="py-3 px-4">Collected Date</th>
              <th className="text-right py-3 px-4">Deduction ₹</th>
              <th className="py-3 px-4">Deduction Reason</th>
              <th className="py-3 px-4">Refunded Date</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              table.paginatedData.map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-16 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl text-text-secondary"><Briefcase size={40} /></div>
                    <p className="text-base text-text-secondary">No security deposits recorded.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-text-primary text-sm">{d.studentName}</div>
                    <div className="text-xs text-text-secondary">{d.smartId}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-sm text-text-primary">{formatCurrency(d.depositAmount)}</td>
                  <td className="py-3 px-4">
                    <span className={`${STATUS_BADGE[d.status] || 'bg-input text-text-primary border border-border'} px-2 py-0.5 rounded-full text-xs font-bold border capitalize`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-text-primary">{d.collectedBy}</td>
                  <td className="py-3 px-4 text-xs text-text-secondary">{d.collectedDate}</td>
                  <td className={`py-3 px-4 text-right text-sm font-semibold ${d.deductionAmount > 0 ? 'text-danger' : 'text-text-secondary'}`}>
                    {d.deductionAmount > 0 ? formatCurrency(d.deductionAmount) : '—'}
                  </td>
                  <td className="py-3 px-4 text-xs text-text-secondary">{d.deductionReason || '—'}</td>
                  <td className="py-3 px-4 text-xs text-text-secondary">{d.refundedDate || '—'}</td>
                  <td className="py-3 px-4">
                    {d.status === 'held' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="bg-success/10 text-success border border-success/20 px-2 py-1 rounded-md text-xs font-bold hover:bg-success hover:text-success-foreground transition-colors cursor-pointer flex items-center gap-1"
                          onClick={() => openRefund(d)}
                        >
                          <Undo2 size={11} /> Process Refund
                        </button>
                        <button
                          className="bg-warning/10 text-warning border border-warning/20 px-2 py-1 rounded-md text-xs font-bold hover:bg-warning hover:text-warning-foreground transition-colors cursor-pointer flex items-center gap-1"
                          onClick={() => openDeduct(d)}
                        >
                          <Minus size={11} /> Add Deduction
                        </button>
                      </div>
                    )}
                    {d.status === 'refunded' && d.refundedDate && (
                      <span className="text-xs text-text-secondary flex justify-end">Refunded {d.refundedDate}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      </div>

      <SuperadminSecurityDepositRefundModal 
        target={refundTarget}
        onClose={() => setRefundTarget(null)}
        onSubmit={handleRefundSubmit}
        isProcessing={isProcessing}
      />
      <SuperadminSecurityDepositDeductModal 
        target={deductTarget}
        onClose={() => setDeductTarget(null)}
        onSubmit={handleDeductSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}
