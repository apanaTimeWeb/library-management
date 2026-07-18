// RESPONSIBILITY: Renders the InvoiceIdClient component.
'use client';

import { formatCurrency, formatDate } from '@/app/superadmin/superadmin_finance/superadmin_finance_utils/superadmin_format';
import { Printer, ArrowLeft, Send } from 'lucide-react';
import { useInvoiceIdClient } from './useInvoiceIdClient';

export function InvoiceIdClient() {
  const {
    router,
    invoiceData: INV,
    handleWhatsApp,
    handlePrint,
  } = useInvoiceIdClient();

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center gap-2 bg-input text-text-primary border border-border px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" 
          onClick={() => router.push('/superadmin/superadmin_finance/invoice')}
        >
          <ArrowLeft size={14} /> Back to Invoices
        </button>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 bg-input text-text-primary border border-border px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" 
            onClick={handlePrint}
          >
            <Printer size={14} /> Print (Thermal)
          </button>
          <button 
            className="flex items-center gap-2 bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-[var(--radius-md)] text-[12px] font-bold hover:bg-success hover:text-success-foreground transition-colors cursor-pointer" 
            onClick={handleWhatsApp}
          >
            <Send size={14} /> WhatsApp
          </button>
        </div>
      </div>

      {/* A4 Invoice */}
      <div className="bg-white text-black shadow-lg rounded-[var(--radius-lg)] max-w-3xl mx-auto p-10 border border-gray-200">
        <div className="text-center mb-8 border-b-2 border-gray-100 pb-6">
          <h1 className="text-[28px] font-black tracking-widest text-gray-800">TAX INVOICE</h1>
          <p className="text-[14px] font-medium text-gray-500 uppercase tracking-widest mt-1">{INV.invoiceNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">From</p>
            <p className="text-[16px] font-bold text-gray-800">{INV.libraryName}</p>
            <p className="text-[13px] text-gray-600 mt-1">{INV.libraryAddress}</p>
            <p className="text-[13px] text-gray-600 mt-1"><span className="font-semibold">GSTIN:</span> {INV.libraryGstin}</p>
            <p className="text-[13px] text-gray-600 mt-1">{INV.libraryPhone}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</p>
            <p className="text-[16px] font-bold text-gray-800">{INV.studentName}</p>
            <p className="text-[13px] text-gray-600 mt-1"><span className="font-semibold">Smart ID:</span> {INV.studentSmartId}</p>
            <p className="text-[13px] text-gray-600 mt-1">{INV.studentAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-[var(--radius-md)]">
          <div>
            <span className="text-[12px] font-medium text-gray-500 block mb-1">Invoice Date</span>
            <span className="text-[14px] font-bold text-gray-800">{formatDate(INV.invoiceDate)}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-gray-500 block mb-1">Payment Date</span>
            <span className="text-[14px] font-bold text-gray-800">{formatDate(INV.paymentDate)}</span>
          </div>
        </div>

        <table className="w-full text-sm mb-6 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-[11px] font-bold tracking-wider">
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
            {INV.items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="py-4 px-4 text-[13px] font-medium text-gray-800">{item.description}</td>
                <td className="py-4 px-4 text-[13px] font-mono text-gray-600">{item.hsnCode}</td>
                <td className="py-4 px-4 text-[13px] text-gray-500">{item.duration}</td>
                <td className="py-4 px-4 text-[13px] text-right font-medium text-gray-800">{formatCurrency(item.amount)}</td>
                <td className="py-4 px-4 text-[13px] text-right text-gray-600">{item.gstPercent}%</td>
                <td className="py-4 px-4 text-[13px] text-right text-gray-600">{formatCurrency(item.gstAmount)}</td>
                <td className="py-4 px-4 text-[13px] text-right font-bold text-gray-800">{formatCurrency(item.amount + item.gstAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col items-end gap-2 mb-8">
          {[
            { l: 'Subtotal', v: formatCurrency(INV.subtotal) },
            { l: 'GST',      v: formatCurrency(INV.totalGst) },
          ].map(( r ) => (
            <div key={r.l} className="flex justify-between w-64 px-4">
              <span className="text-[13px] font-medium text-gray-500">{r.l}</span>
              <span className="text-[13px] font-semibold text-gray-800">{r.v}</span>
            </div>
          ))}
          <div className="w-64 h-[1px] bg-gray-200 my-2" />
          <div className="flex justify-between w-64 px-4 bg-gray-50 py-3 rounded-[var(--radius-md)]">
            <span className="text-[14px] font-bold text-gray-800 uppercase">Grand Total</span>
            <span className="text-[16px] font-black text-green-600">{formatCurrency(INV.grandTotal)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10 bg-gray-50 p-6 rounded-[var(--radius-md)] border border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Mode</p>
            <p className="text-[14px] font-bold text-gray-800">{INV.paymentMode}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Transaction ID</p>
            <p className="text-[14px] font-mono font-medium text-gray-700">{INV.paymentTransactionId}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-[var(--radius-full)] text-[12px] font-bold uppercase tracking-wider">
              {INV.paymentStatus}
            </span>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 mb-2">_________________________</p>
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Authorized Signature</p>
          <p className="text-[13px] text-gray-400 mt-6 italic">Thank you for choosing {INV.libraryName}</p>
        </div>

        {/* Print/WhatsApp buttons inside card too */}
        <div className="flex gap-3 justify-center mt-10">
          <button 
            className="flex items-center gap-2 bg-gray-100 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-[var(--radius-md)] text-[13px] font-bold hover:bg-gray-200 transition-colors cursor-pointer" 
            onClick={handlePrint}
          >
            <Printer size={16} /> Print Thermal Receipt
          </button>
          <button 
            className="flex items-center gap-2 bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/20 px-4 py-2.5 rounded-[var(--radius-md)] text-[13px] font-bold hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer" 
            onClick={handleWhatsApp}
          >
            <Send size={16} /> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
