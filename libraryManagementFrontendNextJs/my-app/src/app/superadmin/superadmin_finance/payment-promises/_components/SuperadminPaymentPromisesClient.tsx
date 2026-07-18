'use client';
// RESPONSIBILITY: Renders the SuperadminPaymentPromisesClient component.
import toast from 'react-hot-toast';
import { formatCurrency } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import { CheckCircle, CalendarPlus } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { SUPERADMIN_FINANCE_PROMISE_STATUS_BADGE } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';
import { useSuperadminPaymentPromisesClient } from '@/app/superadmin/superadmin_finance/payment-promises/_components/useSuperadminPaymentPromisesClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminPaymentPromisesClient() {
    const table = useClientTable(Array.from({ length: 4 }));
  const {
    statusFilter,
    setStatusFilter,
    filteredPromises,
    isLoading,
    extendDialog,
    setExtendDialog,
    newDate,
    setNewDate,
    extendReason,
    setExtendReason,
    handleFulfill,
    handleExtend,
  } = useSuperadminPaymentPromisesClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Payment Promises</h1>
        <p className="text-xs text-text-secondary">Track and manage student payment commitments.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="w-40">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Fulfilled', value: 'fulfilled' },
              { label: 'Overdue', value: 'overdue' }
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
              <th className="text-right py-3 px-4">Promised ₹</th>
              <th className="py-3 px-4">Expected Date</th>
              <th className="py-3 px-4">Days Until/Since Due</th>
              <th className="py-3 px-4">Times Changed</th>
              <th className="py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              table.paginatedData.map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-primary/5">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-20 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredPromises.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl">🤝</div>
                    <p className="text-base text-text-secondary">No payment promises recorded.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPromises.map(( p ) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-primary/5 cursor-pointer transition-colors duration-200" onClick={() => toast.success(`Viewing promise for ${p.studentName}`)}>
                  <td className="py-3 px-4">
                    <div className="font-medium text-text-primary text-sm">{p.studentName}</div>
                    <div className="text-xs text-text-secondary">{p.smartId}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-text-primary text-sm">{formatCurrency(p.promisedAmount)}</td>
                  <td className="py-3 px-4 text-xs text-text-secondary">{p.expectedDate}</td>
                  <td className="py-3 px-4">
                    <span className={p.daysUntilDue < 0 ? 'text-danger font-semibold text-sm' : p.daysUntilDue <= 3 ? 'text-warning text-sm' : 'text-text-primary text-sm'}>
                      {p.daysUntilDue < 0 ? `${Math.abs(p.daysUntilDue)}d overdue` : `${p.daysUntilDue}d`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {p.timesChanged >= 3 ? (
                      <span className="bg-danger text-danger-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">{p.timesChanged}x changed</span>
                    ) : p.timesChanged > 0 ? (
                      <span className="bg-warning text-warning-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">{p.timesChanged}x changed</span>
                    ) : (
                      <span className="text-text-secondary">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={SUPERADMIN_FINANCE_PROMISE_STATUS_BADGE[p.status] || 'bg-bg-pageorder text-text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold'}>{p.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    {p.status !== 'fulfilled' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="bg-success text-success-foreground px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 hover:brightness-95 transition-all duration-200"
                          onClick={(e) => { e.stopPropagation(); handleFulfill(p.id, p.studentName); }}
                        >
                          <CheckCircle size={11} /> Mark Paid
                        </button>
                        <button
                          className="bg-warning text-warning-foreground px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 hover:brightness-95 transition-all duration-200"
                          onClick={(e) => { e.stopPropagation(); setExtendDialog({ id: p.id, name: p.studentName }); }}
                        >
                          <CalendarPlus size={11} /> Extend Date
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-secondary">Paid on {p.fulfilledDate}</span>
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

      {extendDialog && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg-pagelack/60 backdrop-blur-sm transition-opacity" onClick={() => setExtendDialog(null)} />
          <div className="relative w-full max-w-md bg-card rounded-xl shadow-2xl overflow-hidden p-7 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-text-primary mb-4">📅 Extend Promise — {extendDialog.name}</h2>
            <button className="absolute top-4 right-4 text-text-secondary hover:text-danger transition-colors cursor-pointer" onClick={() => setExtendDialog(null)}>✕</button>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-text-secondary block mb-1">New Expected Date <span className="text-danger">*</span></label>
                <input type="date" className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={newDate} onChange={( e: React.ChangeEvent<HTMLInputElement> ) => setNewDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-bold text-text-secondary block mb-1">Reason <span className="text-danger">*</span></label>
                <textarea className="w-full bg-input border border-border rounded-md py-2.5 px-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" value={extendReason} onChange={( e: React.ChangeEvent<HTMLTextAreaElement> ) => setExtendReason(e.target.value)} placeholder="Reason for extension..." rows={2} />
              </div>
              <div className="bg-warning text-warning-foreground text-xs font-semibold p-2 rounded flex justify-center">
                 This will decrease the student&apos;s Trust Score.
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 bg-transparent border border-border text-text-primary text-sm font-medium rounded-md hover:bg-primary/5 transition-colors duration-200 cursor-pointer" onClick={() => setExtendDialog(null)}>Cancel</button>
              <button
                className="px-4 py-2 bg-warning text-warning-foreground text-sm font-medium rounded-md hover:brightness-95 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                onClick={handleExtend}
                disabled={!newDate || !extendReason}
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
