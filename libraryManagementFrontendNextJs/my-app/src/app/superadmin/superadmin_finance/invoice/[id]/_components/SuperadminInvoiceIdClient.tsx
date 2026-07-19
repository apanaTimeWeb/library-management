'use client';
// RESPONSIBILITY: Renders the SuperadminInvoiceIdClient component.
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';

import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/SuperadminFormat';
import { Printer, ArrowLeft, Send } from 'lucide-react';
import { useSuperadminInvoiceIdClient } from '@/app/superadmin/superadmin_finance/invoice/[id]/_components/useSuperadminInvoiceIdClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminInvoiceIdClient() {
  const {
    router,
    invoiceData: INV,
    handleWhatsApp,
    handlePrint,
  } = useSuperadminInvoiceIdClient();
  const table = useClientTable(INV.items);

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center gap-2 bg-input text-text-primary border border-border px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" 
          onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_INVOICE)}
        >
          <ArrowLeft size={14} /> Back to Invoices
        </button>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 bg-input text-text-primary border border-border px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" 
            onClick={handlePrint}
          >
            <Printer size={14} /> Print (Thermal)
          </button>
          <button 
            className="flex items-center gap-2 bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-success hover:text-success-foreground transition-colors cursor-pointer" 
            onClick={handleWhatsApp}
          >
            <Send size={14} /> WhatsApp
          </button>
        </div>
      </div>

      {/* A4 Invoice */}
      <div className="bg-white text-black shadow-lg rounded-lg max-w-3xl mx-auto p-10 border border-border">
        <div className="text-center mb-8 border-b-2 border-border pb-6">
          <h1 className="text-3xl font-black tracking-widest text-text-primary">TAX INVOICE</h1>
          <p className="text-sm font-medium text-text-secondary uppercase tracking-widest mt-1">{INV.invoiceNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">From</p>
            <p className="text-base font-bold text-text-primary">{INV.libraryName}</p>
            <p className="text-sm text-text-secondary mt-1">{INV.libraryAddress}</p>
            <p className="text-sm text-text-secondary mt-1"><span className="font-semibold">GSTIN:</span> {INV.libraryGstin}</p>
            <p className="text-sm text-text-secondary mt-1">{INV.libraryPhone}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Billed To</p>
            <p className="text-base font-bold text-text-primary">{INV.studentName}</p>
            <p className="text-sm text-text-secondary mt-1"><span className="font-semibold">Smart ID:</span> {INV.studentSmartId}</p>
            <p className="text-sm text-text-secondary mt-1">{INV.studentAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 bg-card p-4 rounded-md">
          <div>
            <span className="text-xs font-medium text-text-secondary block mb-1">Invoice Date</span>
            <span className="text-sm font-bold text-text-primary">{formatDate(INV.invoiceDate)}</span>
          </div>
          <div>
            <span className="text-xs font-medium text-text-secondary block mb-1">Payment Date</span>
            <span className="text-sm font-bold text-text-primary">{formatDate(INV.paymentDate)}</span>
          </div>
        </div>

        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm mb-6 border-collapse">
          <thead>
            <tr className="bg-card text-text-secondary uppercase text-xs font-bold tracking-wider">
              <th className="text-left py-3 px-4 rounded-tl-[var(--radius-md)]">Description</th>
              <th className="text-left py-3 px-4">HSN</th>
              <th className="text-left py-3 px-4">Duration</th>
              <th className="text-right py-3 px-4">Amount</th>
              <th className="text-right py-3 px-4">GST %</th>
              <th className="text-right py-3 px-4">GST</th>
              <th className="text-right py-3 px-4 rounded-tr-[var(--radius-md)]">Total</th>
            </tr>
          </thead>
          <tbody>
            {table.paginatedData.map((item, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-4 px-4 text-sm font-medium text-text-primary">{item.description}</td>
                <td className="py-4 px-4 text-sm font-mono text-text-secondary">{item.hsnCode}</td>
                <td className="py-4 px-4 text-sm text-text-secondary">{item.duration}</td>
                <td className="py-4 px-4 text-sm text-right font-medium text-text-primary">{formatCurrency(item.amount)}</td>
                <td className="py-4 px-4 text-sm text-right text-text-secondary">{item.gstPercent}%</td>
                <td className="py-4 px-4 text-sm text-right text-text-secondary">{formatCurrency(item.gstAmount)}</td>
                <td className="py-4 px-4 text-sm text-right font-bold text-text-primary">{formatCurrency(item.amount + item.gstAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />

        <div className="flex flex-col items-end gap-2 mb-8">
          {[
            { l: 'Subtotal', v: formatCurrency(INV.subtotal) },
            { l: 'GST',      v: formatCurrency(INV.totalGst) },
          ].map(( r ) => (
            <div key={r.l} className="flex justify-between w-64 px-4">
              <span className="text-sm font-medium text-text-secondary">{r.l}</span>
              <span className="text-sm font-semibold text-text-primary">{r.v}</span>
            </div>
          ))}
          <div className="w-64 h-px bg-outline-variant my-2" />
          <div className="flex justify-between items-center border-t border-border pt-3 mt-3 w-64 px-4">
            <span className="text-base font-bold text-text-primary">Total Amount Paid</span>
            <span className="text-base font-black text-success">{formatCurrency(INV.grandTotal)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10 bg-surface-variant p-6 rounded-md border border-border">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Payment Mode</p>
            <p className="text-sm font-bold text-text-primary">{INV.paymentMode}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Transaction ID</p>
            <p className="text-sm font-mono font-medium text-text-primary">{INV.paymentTransactionId}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {INV.paymentStatus}
            </span>
          </div>
        </div>

          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Authorized Signature</p>
          <p className="text-sm text-text-secondary mt-6 italic">Thank you for choosing {INV.libraryName}</p>

        {/* Print/WhatsApp buttons inside card too */}
        <div className="flex gap-3 justify-center mt-10">
          <button 
            className="flex items-center gap-2 bg-card text-text-primary border border-border px-4 py-2.5 rounded-md text-sm font-bold hover:bg-bg-pageorder transition-colors cursor-pointer" 
            onClick={handlePrint}
          >
            <Printer size={16} /> Print Thermal Receipt
          </button>
          <button 
            className="flex items-center gap-2 bg-green-500/10 text-emerald-700 border border-green-500/20 px-4 py-2.5 rounded-md text-sm font-bold hover:bg-green-500 hover:text-white transition-colors cursor-pointer" 
            onClick={handleWhatsApp}
          >
            <Send size={16} /> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
