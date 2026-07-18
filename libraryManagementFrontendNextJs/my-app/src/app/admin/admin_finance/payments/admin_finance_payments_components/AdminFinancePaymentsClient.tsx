'use client';
// RESPONSIBILITY: Renders the AdminFinancePaymentsClient component.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Receipt, Trash2, FileText, Download, X , Search} from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/admin/admin_finance/admin_finance_utils/format';
import { useAdminFinancePayments } from '@/app/admin/admin_finance/payments/admin_finance_payments_hooks/useAdminFinancePayments';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export function AdminFinancePaymentsClient() {

  const router = useRouter();
  const {
    visible,
    modeFilter,
    setModeFilter,
    showDeleted,
    setShowDeleted,
    deleteDialog,
    setDeleteDialog,
    deleteReason,
    setDeleteReason,
    isDeleting,
    handleDelete,
    isLoading
  } = useAdminFinancePayments();

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getModeBadge = (mode: string) => {
    switch(mode.toLowerCase()) {
      case 'cash': return 'bg-success/10 text-success';
      case 'upi': return 'bg-primary/10 text-primary';
      case 'card': return 'bg-warning/10 text-warning';
      case 'bank': return 'bg-info/10 text-info';
      default: return 'bg-muted text-muted-foreground';
    }
  };
    const table = useClientTable(visible, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete payment ledger with audit trail.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/30 p-3 rounded-lg border border-border">
        <select 
          className="flex h-9 w-44 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-1 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
          value={modeFilter} 
          onChange={(e) => setModeFilter(e.target.value)}
        >
          <option value="all">All Modes</option>
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="bank">Bank Transfer</option>
        </select>
        
        <div className="flex items-center gap-2">
          <Switch 
            checked={showDeleted}
            onCheckedChange={setShowDeleted}
            id="show-deleted"
          />
          <label htmlFor="show-deleted" className="text-sm font-medium text-muted-foreground cursor-pointer">
            Show Deleted
          </label>
        </div>
        
        <Button variant="outline" size="sm" className="ml-auto gap-2 h-9">
          <Download size={14} /> Export
        </Button>
      </div>

      {/* Ledger Table */}
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
      <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">Receipt #</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Txn ID</th>
                <th className="px-4 py-3 text-right">Late Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading payments...</p>
                    </div>
                  </td>
                </tr>
              ) : table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-20 text-center text-muted-foreground">
                    No payments found matching your criteria.
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((p) => {
                  const isDeleted = p.status === 'deleted';
                  return (
                    <tr key={p.id} className={`hover:bg-muted/10 transition-colors ${isDeleted ? 'bg-danger/5' : ''}`}>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-sm font-medium ${isDeleted ? 'line-through opacity-50 text-muted-foreground' : 'text-primary'}`}>
                          {p.receiptNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground font-medium">
                        {formatDate(p.date)}
                      </td>
                      <td className={`px-4 py-3 ${isDeleted ? 'opacity-50' : ''}`}>
                        <div className="font-bold text-sm text-primary">{p.studentName}</div>
                        <div className="text-xs text-muted-foreground font-medium">{p.smartId}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-bold text-sm text-primary">
                          {formatCurrency(p.amount)}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${isDeleted ? 'opacity-50' : ''}`}>
                        <Badge variant="secondary" className={`${getModeBadge(p.mode)} border-none uppercase tracking-wider font-bold text-xs`}>
                          {p.mode}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-muted-foreground">{p.txnId || '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-sm font-bold ${p.lateFee > 0 ? 'text-warning' : 'text-muted-foreground opacity-50'}`}>
                          {formatCurrency(p.lateFee)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {isDeleted ? (
                            <Badge variant="secondary" className="bg-danger/10 text-danger border-none uppercase tracking-wider font-bold text-xs w-fit">
                              Deleted
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-success/10 text-success border-none uppercase tracking-wider font-bold text-xs w-fit">
                              Valid
                            </Badge>
                          )}
                          {isDeleted && p.deletionReason && (
                            <span className="text-xs text-muted-foreground leading-tight max-w-32 truncate" title={p.deletionReason}>
                              {p.deletionReason}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!isDeleted && (
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                              title="View Receipt"
                              onClick={() => router.push(ADMIN_ROUTES.FINANCE_RECEIPT_ID(p.id))}
                            >
                              <Receipt size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                              title="View Invoice"
                              onClick={() => router.push(ADMIN_ROUTES.FINANCE_INVOICE_ID(p.id))}
                            >
                              <FileText size={14} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-muted-foreground hover:text-danger hover:bg-danger/10" 
                              title="Delete Payment"
                              onClick={() => setDeleteDialog({ id: p.id, receipt: p.receiptNumber })}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
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
            totalItems={visible.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteDialog(null)}>
          <Card className="w-full max-w-sm shadow-lg border-danger/20 bg-card p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-danger tracking-tight">
                <Trash2 size={18} /> Delete Payment
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setDeleteDialog(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-bold text-primary mb-1">{deleteDialog.receipt}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Soft-delete this payment? This action is permanent and logged in Audit Logs.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Deletion reason <span className="text-danger">*</span></label>
              <textarea
                className="flex min-h-20 w-full rounded-md border border-border bg-bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Enter reason for deletion..."
              />
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setDeleteDialog(null)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting || !deleteReason.trim()}
                className="gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete Payment'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
