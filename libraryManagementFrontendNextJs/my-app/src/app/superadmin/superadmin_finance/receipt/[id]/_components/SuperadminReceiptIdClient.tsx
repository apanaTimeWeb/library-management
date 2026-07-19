'use client';
// RESPONSIBILITY: Renders the SuperadminReceiptIdClient component.
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';

import { ArrowLeft, BookOpen, CheckCircle, Printer, Send } from 'lucide-react';
import { useSuperadminReceiptIdClient } from '@/app/superadmin/superadmin_finance/receipt/[id]/_components/useSuperadminReceiptIdClient';

export function SuperadminReceiptIdClient() {
  const {
    router,
    receiptData,
    handleWhatsApp,
    handlePrint,
  } = useSuperadminReceiptIdClient();

  return (
    <div className="space-y-4">
      {/* Back + actions */}
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center gap-2 bg-input text-text-primary border border-border px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer" 
          onClick={() => router.push(SUPERADMIN_ROUTES.FINANCE_RECEIPT)}
        >
          <ArrowLeft size={14} /> Back to Receipts
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

      {/* Visual receipt */}
      <div className="flex flex-col items-center">
        {/* Container with shadow and rounded core */}
        <div className="w-full max-w-xs bg-bg-page text-text-primary shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative mt-4 filter drop-shadow-xl font-mono" style={{ color: '#111827' }}>
          
          {/* Top Zigzag */}
          <div className="h-3 w-full relative overflow-hidden bg-transparent z-10 before:absolute before:inset-0 before:bg-bg-page" style={{ maskImage: 'radial-gradient(4px at 4px 12px, transparent 0, transparent 4px, black 4.5px)', maskSize: '8px 12px', maskPosition: '0 -4px', maskRepeat: 'repeat-x', WebkitMaskImage: 'radial-gradient(4px at 4px 12px, transparent 0, transparent 4px, black 4.5px)', WebkitMaskSize: '8px 12px', WebkitMaskPosition: '0 -4px', WebkitMaskRepeat: 'repeat-x' }}></div>

          <div className="px-6 py-4 flex flex-col items-center">
            {/* Logo area */}
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
              <BookOpen size={24} />
            </div>
            
            <p className="text-base font-black tracking-widest uppercase mb-1">Smart Library</p>
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border pb-2 mb-4 w-full text-center">Payment Receipt</h2>
            
            <div className="w-full flex justify-between items-center mb-6 bg-card p-2 rounded">
              <p className="text-xs font-bold text-text-secondary uppercase">Receipt No.</p>
              <p className="text-sm font-black">{receiptData.receiptNo}</p>
            </div>

            <div className="space-y-2 text-left mb-6 w-full text-xs">
              {[
                ['Date',       receiptData.date],
                ['Student',    receiptData.studentName],
                ['Smart ID',   receiptData.studentId],
                ['Phone',      '+91 ' + receiptData.phone],
                ['Shift',      receiptData.shift],
                ['Seat',       receiptData.seat],
                ['Plan',       receiptData.plan],
                ['Mode',       receiptData.paymentMode],
                ['Txn ID',     receiptData.txnId],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-border border-dashed pb-1">
                  <span className="text-text-secondary font-medium">{l}</span>
                  <span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
            
            {/* Items */}
            <div className="text-left mb-4 w-full space-y-1 text-xs">
              {receiptData.items.map((item: { label: string; amount: number }) => (
                <div key={item.label} className="flex justify-between font-medium">
                  <span className="text-text-secondary">{item.label}</span>
                  <span>Rs.{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            
            <div className="w-full border-t-2 border-dashed border-border py-3 mt-2 flex justify-between items-center">
              <p className="text-sm font-bold text-text-primary-subtle uppercase">Total Paid</p>
              <h2 className="text-3xl font-black text-text-primary mt-1 tracking-tight">Rs.{receiptData.total.toLocaleString('en-IN')}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-6 bg-success-bg text-success px-3 py-1.5 rounded-full border border-success-subtle shadow-sm">
              <CheckCircle size={14} className="text-success" />
              <span className="text-xs font-bold uppercase tracking-wider">Payment Successful</span>
            </div>
            
            <p className="text-xs italic text-text-primary-subtle text-center mb-1">&quot;Knowledge is the best investment.&quot;</p>
            <p className="text-xs font-bold text-text-primary-subtle text-center">Thank you! Keep studying 😊</p>
          </div>

          {/* Bottom Zigzag */}
          <div className="h-3 w-full relative overflow-hidden bg-transparent z-10 before:absolute before:inset-0 before:bg-bg-page" style={{ maskImage: 'radial-gradient(4px at 4px 0, transparent 0, transparent 4px, black 4.5px)', maskSize: '8px 12px', maskPosition: '0 4px', maskRepeat: 'repeat-x', WebkitMaskImage: 'radial-gradient(4px at 4px 0, transparent 0, transparent 4px, black 4.5px)', WebkitMaskSize: '8px 12px', WebkitMaskPosition: '0 4px', WebkitMaskRepeat: 'repeat-x' }}></div>
        </div>

        {/* Action buttons below card */}
        <div className="w-full max-w-xs mt-6 flex flex-col gap-3">
          <button 
            className="flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-emerald-700 rounded-lg py-3 px-4 font-bold text-sm transition-colors shadow-lg shadow-green-500/20 cursor-pointer" 
            onClick={handleWhatsApp}
          >
            <Send size={18} /> Send via WhatsApp
          </button>
          <button 
            className="flex items-center justify-center gap-2 bg-input text-text-primary border border-border hover:bg-primary/10 hover:text-primary rounded-lg py-3 px-4 font-bold text-sm transition-colors cursor-pointer" 
            onClick={handlePrint}
          >
            <Printer size={18} /> Print (80mm Thermal)
          </button>
        </div>
      </div>
    </div>
  );
}
