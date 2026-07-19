'use client';
// RESPONSIBILITY: Renders the SuperadminInvoiceClient component.
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';

import { useRouter } from 'next/navigation';
import { Search, FileText, Printer, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/Superadminsuperadmin_format';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminInvoiceClient } from '@/app/superadmin/superadmin_finance/invoice/_components/useSuperadminInvoiceClient';
import type { SuperadminFinanceInvoiceFilterStatus } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const STATUS_BADGE: Record<string, string> = {
  paid: 'bg-success/10 text-success border-success/20', 
  pending: 'bg-warning/10 text-warning border-warning/20', 
  overdue: 'bg-danger/10 text-danger border-danger/20',
};

export function SuperadminInvoiceClient() {
  const router = useRouter();
  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    filtered,
    totalInvoices, totalBilled, pendingCount,
    handleWhatsApp, handlePrint
  } = useSuperadminInvoiceClient();
  const table = useClientTable(filtered);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Invoices</h1>
        <p className="text-xs text-text-secondary">View and download GST-compliant tax invoices.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'TOTAL INVOICES', value: totalInvoices },
          { label: 'TOTAL BILLED', value: formatCurrency(totalBilled), success: true },
          { label: 'PENDING / OVERDUE', value: pendingCount, warning: true },
        ].map((k) => (
          <div key={k.label} className={`bg-card rounded-lg border ${k.warning ? 'border-warning/30 bg-gradient-to-br from-warning/5 to-transparent' : 'border-border'} p-4 relative overflow-hidden group`}>
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className={`text-xs font-bold uppercase tracking-wider ${k.warning ? 'text-warning' : 'text-text-secondary'}`}>{k.label}</span>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${k.warning ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                <FileText size={16} />
              </div>
            </div>
            <p className={`text-3xl font-black tracking-tight relative z-10 ${k.success ? 'text-success' : k.warning ? 'text-warning' : 'text-text-primary'}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border w-fit">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input 
            className="w-full bg-input border border-border rounded-md py-2 pl-9 pr-3 text-sm font-medium text-text-primary focus:outline-none focus:border-primary transition-colors" 
            placeholder="Search invoice no., name or ID..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Paid', value: 'paid' },
              { label: 'Pending', value: 'pending' },
              { label: 'Overdue', value: 'overdue' }
            ]}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as SuperadminFinanceInvoiceFilterStatus)}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-xs font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4">Invoice No.</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Date</th>
              <th className="text-right py-3 px-4">Amount</th>
              <th className="py-3 px-4">Mode</th>
              <th className="py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl text-text-secondary"><FileText size={40} /></div>
                    <p className="text-base text-text-secondary">No invoices found.</p>
                  </div>
                </td>
              </tr>
            ) : table.paginatedData.map((inv) => (
              <tr 
                key={inv.id} 
                className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer group" 
                onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_INVOICE_ID(inv.id))}
              >
                <td className="py-3 px-4">
                  <span className="font-mono text-sm font-bold text-text-primary">{inv.invoiceNumber}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-sm text-text-primary group-hover:text-primary transition-colors">{inv.studentName}</div>
                  <div className="text-xs text-text-secondary">{inv.studentId}</div>
                </td>
                <td className="py-3 px-4 text-xs text-text-secondary">{formatDate(inv.invoiceDate)}</td>
                <td className="py-3 px-4 text-right font-semibold text-sm text-text-primary">{formatCurrency(inv.grandTotal)}</td>
                <td className="py-3 px-4">
                  {inv.paymentMode
                    ? <span className="bg-input text-text-primary border border-border px-2 py-0.5 rounded-full text-xs font-bold border capitalize">{inv.paymentMode}</span>
                    : <span className="text-sm text-text-secondary">—</span>}
                </td>
                <td className="py-3 px-4">
                  <span className={`${STATUS_BADGE[inv.paymentStatus] || 'bg-info/10 text-info border-info/20'} px-2 py-0.5 rounded-full text-xs font-bold border capitalize`}>
                    {inv.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors" 
                      onClick={(e) => { e.stopPropagation(); handlePrint(inv); }} 
                      title="Print (Thermal)"
                    >
                      <Printer size={14} />
                    </button>
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-success/10 text-success border border-success/20 hover:bg-success hover:text-success-foreground transition-colors" 
                      onClick={(e) => { e.stopPropagation(); handleWhatsApp(inv); }} 
                      title="Send WhatsApp"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      </div>
    </div>
  );
}
